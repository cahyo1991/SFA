using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CustomerApps.Models;
using CustomerApps.Services;

namespace CustomerApps.Controllers
{
    
    public class LoginController : Controller
    {
        // GET: Login
        public static string MainConnection = ConfigurationManager.AppSettings["MainConnection"];
        public ActionResult Index()
        {
            if (Request.Cookies["IsLogin"] != null)
            {
                return RedirectToAction("Index", "Customer");
            }
            return View();
        }

        public ActionResult Logout()
        {
            //Session.Clear();

            //FormsAuthentication.SignOut();
            CookiesManager.clearAllCookies(this);
            return RedirectToAction("Index", "Login");

        }

        public ActionResult DoLogin(String Nik, String Password )
        {
            Result rr = new Result();
            try
            {
                CookiesManager.clearAllCookies(this);
                SqlConnection conn = new SqlConnection(MainConnection);
                String Sql = "Login";
                SqlCommand cmd = new SqlCommand(Sql, conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.Add("@Nik", Nik);
                cmd.Parameters.Add("@Password", Password);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {

                        CookiesManager.createCookie(this, "Code", dr["Code"].ToString());
                        CookiesManager.createCookie(this, "Email", dr["Email"].ToString());
                        CookiesManager.createCookie(this, "Gender", dr["Gender"].ToString());
                        CookiesManager.createCookie(this, "Id", dr["Id"].ToString());
                        CookiesManager.createCookie(this, "Name", dr["Name"].ToString());
                        CookiesManager.createCookie(this, "Role", dr["Role"].ToString());
                        CookiesManager.createCookie(this, "UserToken", dr["UserToken"].ToString());
                        CookiesManager.createCookie(this, "Year", dr["Year"].ToString());
                        CookiesManager.createCookie(this, "Month", dr["Month"].ToString());
                        CookiesManager.createCookie(this, "Week", dr["Week"].ToString());
                        CookiesManager.createCookie(this, "IdWeek", dr["IdWeek"].ToString());
                        CookiesManager.createCookie(this, "Images", dr["Images"].ToString());
                        CookiesManager.createCookie(this, "Phone", dr["Phone"].ToString());
                        CookiesManager.createCookie(this, "IsLogin", "1");
                    }

                    rr.Message = "Success";
                    rr.Status = 1;
                    rr.Return = null;
                }
                else
                {
                    rr.Message = "Periksa Kembali User Dan Password Anda !";
                    rr.Status = 0;
                    rr.Return = null;
                }

                conn.Close();
                conn.Dispose();

                //CookiesManager.clearAllCookies(this);
                //if (Nik == "A123" && Password == "rahasia")
                //{
                //    rr.Status = 1;
                //    rr.Message = Role.ToString();
                //    rr.Return = null;

                //    CookiesManager.createCookie(this, "Role", Role.ToString());
                //    CookiesManager.createCookie(this, "IsLogin", "1");
                //    CookiesManager.createCookie(this, "Name", "Cahyo Prabowo");
                //}
                //else
                //{
                //    rr.Status = 0;
                //    rr.Message = "Periksa Kembali User Dan Password Anda !";
                //    rr.Return = null;
                //}
            }
            catch (Exception ex)
            {

                rr.Status = 0;
                rr.Message = ex.Message;
                rr.Return = null;
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