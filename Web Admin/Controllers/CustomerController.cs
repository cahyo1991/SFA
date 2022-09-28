using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CustomerApps.Models;

namespace CustomerApps.Controllers
{
    public class CustomerController : Controller
    {
        public static string MainConnection = ConfigurationManager.AppSettings["MainConnection"];

        // GET: Customer
        public ActionResult Index()
        {
            if (Request.Cookies["IsLogin"] == null)
            {
                return RedirectToAction("Index", "Login");
            }




            ViewBag.javascript = "Coverage.js";
            ViewBag.Title = "Coverage Customer";
            return View();
        }


        public ActionResult UpdatePassword() {
            if (Request.Cookies["IsLogin"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ViewBag.javascript = "UpdatePassword.js";
            ViewBag.Title = "Update Password";

            return View();


        }


        public ActionResult DoUpdatePassword(String NewPassword ="") {

            Result rr = new Result();
            try
            {
                SqlConnection conn = new SqlConnection(MainConnection);
                String sql = "[TransactionUser]";
                SqlCommand cmd = new SqlCommand(sql, conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.Add("@Param", "UpdatePassword");
                cmd.Parameters.Add("@Creator", Request.Cookies["Code"].Value);
                cmd.Parameters.Add("@Id", Request.Cookies["Id"].Value);
                cmd.Parameters.Add("@NewPassword", NewPassword);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
                conn.Dispose();
                rr.Status = 1;
                rr.Return = null;
                rr.Message = "Success";
            }
            catch (Exception ex)
            {

                rr.Status = 0;
                rr.Return = null;
                rr.Message = ex.Message;
            }

            return new JsonResult()
            {
                Data = rr,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }

//        public DateTime FormatDateTime(String dt, String FormatDb)
//        {

//            IFormatProvider culture = new CultureInfo("en-US", true);
//            DateTime dateVal = DateTime.ParseExact(dt,
//FormatDb, CultureInfo.InvariantCulture);
//            return dateVal;



//        }



        public ActionResult GetPlan(String Param="", String Id="")
        {
            Result rr = new Result();
            

                try
                {
                    List<ListPlan> Res = new List<ListPlan>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[web_TransactionPlan]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.Add("@Role", Request.Cookies["Role"].Value);
                cmd.Parameters.Add("@Code", Request.Cookies["Code"].Value);
                cmd.Parameters.Add("@Param", Param);
                cmd.Parameters.Add("@Id", Id);
                conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListPlan ls = new ListPlan();
                            ls.CustomerName = dr["CustomerName"].ToString();
                            ls.Date = dr["Date"].ToString();
                            ls.IdCustomer = dr["IdCustomer"].ToString();
                            ls.IdPlan = dr["IdPlan"].ToString();
                            ls.Images = dr["Images"].ToString();
                            ls.OutletName = dr["OutletName"].ToString();
                            ls.Time = dr["Time"].ToString();
                            ls.IdTerritoryCoverage = dr["IdTerritoryCoverage"].ToString();
                            ls.StatusPlanCall = dr["StatusPlanCall"].ToString();
                            ls.Status = dr["Status"].ToString();
                            ls.StatusName = dr["StatusName"].ToString();
                            ls.ReasonNotCall = dr["ReasonNotCall"].ToString();
                        ls.WeekOfMonth = dr["WeekOfMonth"].ToString();
                        ls.MonthOfYear = dr["Month"].ToString();
                        ls.PAMCode = dr["PAMCode"].ToString();
                        ls.PAMName = dr["PAMName"].ToString();
                        ls.ASMCode = dr["ASMCode"].ToString();
                        ls.ASMName = dr["ASMName"].ToString();
                        ls.RSMCode = dr["RSMCode"].ToString();
                        ls.RSMName = dr["RSMName"].ToString();
                            Res.Add(ls);
                        }
                    }
                    rr.Message = "Success";
                    rr.Return = Res;
                    rr.Status = 1;
                    conn.Close();
                    conn.Dispose();
                }
                catch (Exception ex)
                {

                    rr.Message = ex.Message;
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


        public ActionResult GetCall(String Code="", String Param="", String Role="", String Id="")
        {
            Result rr = new Result();
       

                try
                {
                    List<ListPlan> Res = new List<ListPlan>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[web_TransactionCall]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    //cmd.Parameters.Add("@Role", Role);
                    cmd.Parameters.Add("@Param", Param);
                    //cmd.Parameters.Add("@Code", Code);

                cmd.Parameters.Add("@Role", Request.Cookies["Role"].Value);
                cmd.Parameters.Add("@Code", Request.Cookies["Code"].Value);
                cmd.Parameters.Add("@Id", Id);

                conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListPlan ls = new ListPlan();
                        ls.MonthOfYear = dr["MonthOfYear"].ToString();
                            ls.IdCall = dr["IdCall"].ToString();
                            ls.IdCustomer = dr["IdCustomer"].ToString();
                            ls.CustomerName = dr["CustomerName"].ToString();
                            ls.OutletName = dr["OutletName"].ToString();
                            ls.Date = dr["Date"].ToString();
                            ls.Time = dr["Time"].ToString();
                            ls.Images = dr["Images"].ToString();
                            ls.IdTerritoryCoverage = dr["IdTerritoryCoverage"].ToString();
                            ls.CallType = dr["CallType"].ToString();
                        ls.PAMName = dr["PAMName"].ToString();
                        ls.PAMCode = dr["PAMCode"].ToString();
                        ls.ASMCode = dr["ASMCode"].ToString();
                        ls.ASMName = dr["ASMName"].ToString();
                        ls.RSMCode = dr["RSMCode"].ToString();
                        ls.RSMName = dr["RSMName"].ToString();
                        if (Id!="")
                        {
                            ls.Latitude = dr["Latitude"].ToString();
                            ls.Longitude = dr["Longitude"].ToString();
                            
                            ls.Remarks = dr["Remarks"].ToString();
                        }
                        ls.ProductName = dr["ProductName"].ToString();
                        ls.Activity = dr["Activity"].ToString();
                        Res.Add(ls);
                        }
                    }

                    rr.Message = "Success";
                    rr.Return = Res;
                    rr.Status = 1;
                    conn.Close();
                    conn.Dispose();
                }
                catch (Exception ex)
                {

                    rr.Message = ex.Message;
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



        public ActionResult GetDashboard(String Param = "")
        {
            Result rr = new Result();


            try
            {
                List<Dashboard> Res = new List<Dashboard>();
                SqlConnection conn = new SqlConnection(MainConnection);
                String sql = "[web_TransactionDashboard]";
                SqlCommand cmd = new SqlCommand(sql, conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.Add("@Param", Param);
                cmd.Parameters.Add("@Role", Request.Cookies["Role"].Value);
                cmd.Parameters.Add("@Code", Request.Cookies["Code"].Value);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        Dashboard ls = new Dashboard();
                        if (Param == "CallTotal")
                        {
                            ls.MonthName = dr["MonthName"].ToString();
                            ls.Value = dr["Value"].ToString();
                        }
                        else
                        {
                            ls.SetTotalCall = dr["SetTotalCall"].ToString();
                            ls.SetTotalTarget = dr["SetTotalTarget"].ToString();
                            ls.MonthName = dr["MonthName"].ToString();
                            ls.Percentage = dr["Percentage"].ToString();
                        }
                        Res.Add(ls);
                    }
                }

                rr.Message = "Success";
                rr.Return = Res;
                rr.Status = 1;
                conn.Close();
                conn.Dispose();
            }
            catch (Exception ex)
            {

                rr.Message = ex.Message;
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


        public ActionResult GetBirthday()
        {
            Result rr = new Result();
            try
            {
                List<ListBirthday> Res = new List<ListBirthday>();
                SqlConnection conn = new SqlConnection(MainConnection);
                String sql = "[web_TransactionBirthday]";
                SqlCommand cmd = new SqlCommand(sql, conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                //cmd.Parameters.Add("@Param", Param);
                cmd.Parameters.Add("@Role", Request.Cookies["Role"].Value);
                cmd.Parameters.Add("@Code", Request.Cookies["Code"].Value);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        ListBirthday hr = new ListBirthday();
                        hr.CustomerName = dr["CustomerName"].ToString();
                        hr.Date = dr["Date"].ToString();
                        Res.Add(hr);
                    }
                }

                rr.Status = 1;
                rr.Return = Res;
                rr.Message = "Success";
                conn.Close();
                conn.Dispose();


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



        public ActionResult GetHierarcy(String HeadCode="", String RSMCode="" ,String ASMCode="" ) {
            Result rr = new Result();
            try
            {
                List<Hierarcy> Res = new List<Hierarcy>();
                SqlConnection conn = new SqlConnection(MainConnection);
                String sql = "[web_TransactionUser]";
                SqlCommand cmd = new SqlCommand(sql, conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.Add("@Param", "GetHirarki");
                cmd.Parameters.Add("@HeadCode", HeadCode);
                cmd.Parameters.Add("@RSMCode", RSMCode);
                cmd.Parameters.Add("@ASMCode", ASMCode);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        Hierarcy hr = new Hierarcy();
                        hr.Code = dr["Code"].ToString();
                        hr.Name = dr["Name"].ToString();
                        hr.Role = dr["Role"].ToString();
                        Res.Add(hr);
                    }
                }

                rr.Status = 1;
                rr.Return = Res;
                rr.Message = "Success";
                conn.Close();
                conn.Dispose();


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


        public ActionResult Approvals(String IdStatusApproval = "", String Type = "", String Id = "")
        {
            Result rr = new Result();
            try
            {
                List<Hierarcy> Res = new List<Hierarcy>();
                SqlConnection conn = new SqlConnection(MainConnection);
                String sql = "[TransactionHistoryApproval]";
                SqlCommand cmd = new SqlCommand(sql, conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.Add("@ApproverCode", Request.Cookies["Code"].Value);
                cmd.Parameters.Add("@IdStatusApproval", IdStatusApproval);
                cmd.Parameters.Add("@Type", Type);
                if (Type == "Coverage")
                {
                    cmd.Parameters.Add("@IdTerritoryCoverage", Id);
                }
                if (Type == "Customer")
                {
                    cmd.Parameters.Add("@IdCustomer", Id);
                }
                if (Type == "Plan")
                {
                    cmd.Parameters.Add("@IdCallPlan", Id);
                }

                conn.Open();
                cmd.ExecuteNonQuery();

                rr.Status = 1;
                rr.Return = Res;
                rr.Message = "Success";
                conn.Close();
                conn.Dispose();


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


        public DateTime Dt(String Input)
        {
            DateTime dtx = new DateTime();

            dtx = Convert.ToDateTime(Input.ToString());
            return dtx;
        }

        public ActionResult GetEtcp(String Param, String Id="") {

            Result rr = new Result();
            try
            {
                List<ListPlan> Res = new List<ListPlan>();
                SqlConnection conn = new SqlConnection(MainConnection);
                String sql = "web_TransactionTerritoryCoverage";
                SqlCommand cmd = new SqlCommand(sql, conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.Add("@Param", Param);
                cmd.Parameters.Add("@Role", Request.Cookies["Role"].Value);
                cmd.Parameters.Add("@Code", Request.Cookies["Code"].Value);
                cmd.Parameters.Add("@Id", Id);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        ListPlan ls = new ListPlan();
                        ls.IdTerritoryCoverage = dr["Id"].ToString();
                        ls.CustomerName = dr["CustomerName"].ToString();
                        ls.Images = dr["Images"].ToString();
                        ls.IdCustomer = dr["IdCustomer"].ToString();
                        ls.IdSegmentation = dr["IdSegmentation"].ToString();
                        //detail customer model 
                        ls._Address = dr["_Address"].ToString();
                        ls._Child_Birth_1 = dr["_Child_Birth_1"].ToString() != "" && dr["_Child_Birth_1"].ToString() != null ? Dt(dr["_Child_Birth_1"].ToString()).ToString("yyyy-MM-dd") : "";
                        ls._Child_Birth_2 = dr["_Child_Birth_2"].ToString() != "" && dr["_Child_Birth_2"].ToString() != null ? Dt(dr["_Child_Birth_2"].ToString()).ToString("yyyy-MM-dd") : "";
                        ls._Child_Name_1 = dr["_Child_Name_1"].ToString();
                        ls._Child_Name_2 = dr["_Child_Name_2"].ToString();
                        ls._CustomerName = dr["_CustomerName"].ToString();
                        ls._DateOfBirth = dr["_DateOfBirth"].ToString() != "" && dr["_DateOfBirth"].ToString() != null ? Dt(dr["_DateOfBirth"].ToString()).ToString("yyyy-MM-dd") : "";
                        ls._DateOfMarriage = dr["_DateOfMarriage"].ToString() != "" && dr["_DateOfMarriage"].ToString() != null ? Dt(dr["_DateOfMarriage"].ToString()).ToString("yyyy-MM-dd") : "";
                        ls._Email = dr["_Email"].ToString();
                        ls._Hobby = dr["_Hobby"].ToString();
                        ls._Husban_Wife_Name = dr["_Husban_Wife_Name"].ToString();
                        ls._Husband_Wife_Birth = dr["_Husband_Wife_Birth"].ToString() != "" && dr["_Husband_Wife_Birth"].ToString() != null ? Dt(dr["_Husband_Wife_Birth"].ToString()).ToString("yyyy-MM-dd") : "";
                        ls._Id = dr["_Id"].ToString();
                        ls._IdCustomerType = dr["_IdCustomerType"].ToString();
                        ls._IdDoctorTitles = dr["_IdDoctorTitles"].ToString();
                        ls._IdReligion = dr["_IdReligion"].ToString();
                        ls._IdSegmentation = dr["_IdSegmentation"].ToString();
                        ls._IdSpecialty = dr["_IdSpecialty"].ToString();
                        ls._Images = dr["_Images"].ToString();
                        ls._Note = dr["_Note"].ToString();
                        ls._OutletId_1 = dr["_OutletId_1"].ToString();
                        ls._OutletId_2 = dr["_OutletId_2"].ToString();
                        ls._OutletId_3 = dr["_OutletId_3"].ToString();
                        ls._PhoneNumber = dr["_PhoneNumber"].ToString();
                        ls._ProvinceCode = dr["_ProvinceCode"].ToString();
                        ls._OutletName1 = dr["_OutletName1"].ToString();
                        ls._OutletName2 = dr["_OutletName2"].ToString();
                        ls._OutletName3 = dr["_OutletName3"].ToString();
                        ls.PAMCode = dr["PAMCode"].ToString();
                        ls.PAMName = dr["PAMName"].ToString();
                        ls.ASMCode = dr["ASMCode"].ToString();
                        ls.ASMName = dr["ASMName"].ToString();
                        ls.RSMCode = dr["RSMCode"].ToString();
                        ls.RSMName = dr["RSMName"].ToString();
                        ls.SegmentationName = dr["SegmentationName"].ToString();
                        ls.ReligionName = dr["ReligionName"].ToString();
                        ls.CustomerTypeName = dr["CustomerTypeName"].ToString();
                        ls.SpecializationName = dr["SpecializationName"].ToString();
                        ls.AreaName = dr["AreaName"].ToString();
                        Res.Add(ls);
                    }
                }

                rr.Status = 1;
                rr.Message = "Success";
                rr.Return = Res;
                conn.Close();
                conn.Dispose();
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

        public ActionResult MasterCustomer()
        {
            if (Request.Cookies["IsLogin"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ViewBag.javascript = "MasterCustomer.js";
            ViewBag.Title = "Master Customer";
            return View();
        }

        public ActionResult ShowPlanCustomer() {

            if (Request.Cookies["IsLogin"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ViewBag.javascript = "ShowPlanCustomer.js";
            ViewBag.Title = "Plan Customer";
            return View();
        }

        public ActionResult CustomerForm(string TypeForm="Add",int IdCustomer=0)
        {
            if (Request.Cookies["IsLogin"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ViewBag.Title = TypeForm + " Customer";
            return View();
        }
        public ActionResult PendingCoverageCustomer()
        {
            if (Request.Cookies["IsLogin"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ViewBag.Title = "Pending Coverage Customer";
            ViewBag.javascript = "PendingCoverageCustomer.js";
            return View();
        }
        public ActionResult PendingNewCustomer()
        {
            if (Request.Cookies["IsLogin"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ViewBag.Title = "Pending New Customer";
            ViewBag.javascript = "PendingNewCustomer.js";
            return View();
        }
        public ActionResult BirthdayCustomer()
        {
            if (Request.Cookies["IsLogin"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ViewBag.Title = "Birthday Customer";
            ViewBag.javascript = "BirthdayCustomer.js";
            return View();
        }

        public ActionResult CallCustomer() {
            if (Request.Cookies["IsLogin"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ViewBag.Title = "Call Customer";
            ViewBag.javascript = "CallCustomer.js";
            return View();
        }


        public ActionResult Dashboard() {
            if (Request.Cookies["IsLogin"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ViewBag.javascript = "Dashboard.js";
            ViewBag.Title = "Dashboard";
            return View();



        }

        public ActionResult DetailCallCustomer(String Id="1") {
            if (Request.Cookies["IsLogin"] == null)
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.Title = "Detail Call";
            return View();

        }

        public ActionResult PlanCustomer()
        {
            if (Request.Cookies["IsLogin"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ViewBag.Title = "Plan Customer";
            ViewBag.javascript = "PlanCustomer.js";
            return View();
        }

    }
}