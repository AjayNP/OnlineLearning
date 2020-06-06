using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Configuration;
using OnlineLearning.Models;
//using System.IO;

namespace OnlineLearning.Models
{
    public class DBContext : DbContext
    {
        public DBContext()
            : base("ConnectionString")
        {
        }

        public DbSet<MTOrderMaster> MTOrderMasters { get; set; }
        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<MTOrderMaster>().ToTable("MTOrderMasters");
        //    modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        //    base.OnModelCreating(modelBuilder);
        //} 
        
    }
}