using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.IO;

using OnlineLearning.Models;


namespace OnlineLearning.Controllers
{
    public class HomeController : Controller
    {
        DBContext db = new DBContext();

        public ActionResult Index()
        {
            return View();
        }
        //// POST: Home/Create
        //[HttpPost]
        //public ActionResult Index(MTOrderMaster smodel)
        //{
        //    CommonResponse CR = new CommonResponse();
        //    try
        //    {
        //        // TODO: Add insert logic here
        //        if (ModelState.IsValid)
        //        {
        //            //List<LMOrderMaster> LOD = new List<LMOrderMaster>();
        //            MTOrderMaster LM = new MTOrderMaster();
        //            LM.StudentName = smodel.StudentName;
        //            LM.School = smodel.School;
        //            LM.Class = smodel.Class;
        //            LM.EmailID = smodel.EmailID;
        //            LM.Address = smodel.Address;
        //            LM.FatherName = smodel.FatherName;
        //            LM.FatherPhoneNo = smodel.FatherPhoneNo;
        //            LM.Amount = 599;
        //            LM.PaySuccess = "N";
        //            LM.EntryDate = DateTime.Now;
        //            LM.UpdateDate = DateTime.Now;
        //            db.MTOrderMasters.Add(LM);
        //            db.SaveChanges();
        //            db.SaveChanges();

        //            //StudentDBHandle sdb = new StudentDBHandle();
        //            //if (sdb.AddStudent(smodel))
        //            //{
        //            //    ViewBag.Message = "Student Details Added Successfully";
        //            //    ModelState.Clear();
        //            //}
        //        }
        //        else
        //        {
        //            //ModelState.
        //            //ModelState.AddModelError("", "Invalid Credentials");
        //            return PartialView(smodel);
        //        }
        //        return View();

        //        //return RedirectToAction("Index");
        //    }
        //    catch (Exception e)
        //    {

        //        return View("Index");
        //    }
        //}
        // POST: Home/Create
        [HttpPost]
        public JsonResult Index(MTOrderMaster smodel)
        {
            CommonResponse CR = new CommonResponse();
            try
            {
                // TODO: Add insert logic here

                if (ModelState.IsValid)
                {
                    //List<LMOrderMaster> LOD = new List<LMOrderMaster>();
                    MTOrderMaster LM = new MTOrderMaster();
                    LM.StudentName = smodel.StudentName;
                    LM.School = smodel.School;
                    LM.Class = smodel.Class;
                    LM.EmailID = smodel.EmailID;
                    LM.Address = smodel.Address;
                    LM.FatherName = smodel.FatherName;
                    LM.FatherPhoneNo = smodel.FatherPhoneNo;
                    LM.Amount = 599;
                    LM.PaySuccess = "N";
                    LM.EntryDate = DateTime.Now;
                    LM.UpdateDate = DateTime.Now;
                    db.MTOrderMasters.Add(LM);
                    db.SaveChanges();

                    CR.Message = "Saved Successfully";
                    return Json(CR);
                    //StudentDBHandle sdb = new StudentDBHandle();
                    //if (sdb.AddStudent(smodel))
                    //{
                    //    ViewBag.Message = "Student Details Added Successfully";
                    //    ModelState.Clear();
                    //}
                }
                else
                {
                    // return Json(smodel, JsonRequestBehavior.AllowGet);
                   // return Json(ModelState.Values.SelectMany(x => x.Errors));
                    //.Select(e => e.ErrorMessage)
                    //ModelState.
                    //ModelState.AddModelError("", "Invalid Credentials");
                    //return PartialView(smodel);
                    // CR.Data = RenderHelper.PartialView(this, "_Order.cshtml", smodel);
                }
                return Json(CR);

                //return RedirectToAction("Index");
            }
            catch (Exception e)
            {
                CR.Message = e.Message;

                return Json(CR);
            }
        }
        public static class RenderHelper
        {
            public static string PartialView(Controller controller, string viewName, object model)
            {
                controller.ViewData.Model = model;

                using (var sw = new StringWriter())
                {
                    var viewResult = ViewEngines.Engines.FindPartialView(controller.ControllerContext, viewName);
                    var viewContext = new ViewContext(controller.ControllerContext, viewResult.View, controller.ViewData, controller.TempData, sw);

                    viewResult.View.Render(viewContext, sw);
                    viewResult.ViewEngine.ReleaseView(controller.ControllerContext, viewResult.View);

                    return sw.ToString();
                }
            }
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult OnlinePayment()
        {
             ViewBag.Message = "Your OnlinePayment page.";
            return View();
        }
    }
}