using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace OnlineLearning.Models
{

    public class CommonResponse
    {
        public string Message { get; set; }
        public string Data { get; set; }
    }
    public class MTOrderMaster
    {
    [Key]
    //[DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)] 
        public int OID { get; set; }

        [Required(ErrorMessage = "Student name is required.")]
        public string StudentName { get; set; }

        [Required(ErrorMessage = "Class is required.")]
        public string Class { get; set; }

        [Required(ErrorMessage = "School is required.")]
        public string School { get; set; }

        [Required(ErrorMessage = "FatherName is required.")]
        public string FatherName { get; set; }

        [Required(ErrorMessage = "EmailID is required.")]
        [DataType(DataType.EmailAddress)]
        //[Required(ErrorMessage = "Please enter Email ID")]
        [RegularExpression(@"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$", ErrorMessage = "Email is not valid.")]
        public string EmailID { get; set; }

        [Required(ErrorMessage = "FatherPhoneNo is required.")]
        public string FatherPhoneNo { get; set; }

        [Required(ErrorMessage = "Address is required.")]
        public string Address { get; set; }

        [Required(ErrorMessage = "Amount is required.")]
        public decimal Amount { get; set; }
        public string PaySuccess { get; set; }
        public Nullable<int> EntryUserID { get; set; }
        public DateTime EntryDate { get; set; }
        public Nullable<int> UpdateUserID { get; set; }
        public Nullable<DateTime> UpdateDate { get; set; }



    }
}