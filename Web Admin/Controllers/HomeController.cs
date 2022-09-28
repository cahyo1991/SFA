using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerApps.Controllers
{
    public class HomeController : Controller
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


        public string ValidateADLogin(string Username, string Password)
        {
            string Success = "Success";
            try
            {
                DirectoryEntry Entry = new DirectoryEntry("LDAP://" + "ETANABIOTECH", Username, Password);
                DirectorySearcher Searcher = new DirectorySearcher(Entry);
                Searcher.SearchScope = System.DirectoryServices.SearchScope.OneLevel;
                SearchResult Results = Searcher.FindOne();
                Success = "Success";
            }
            catch
            {
                Success = "Gagal";
            }
            return Success;
        }
    }
}