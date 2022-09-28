using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using APISFA.Models;
namespace APISFA.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
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


        [HttpGet]
        public JsonResult TestApi() {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken() ,"code" ))
            {

                
                rr.Message = GetToken();
                rr.Return = null;
                rr.Status = 1;


            }
            else
            {

                
                rr.Message = "Token Error";
                rr.Return = null;
                rr.Status = 0;

            }


            return new JsonResult()
            {
                Data = rr,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

    }
}