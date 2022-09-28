using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using APISFA.Models;

namespace APISFA.Controllers
{
    public class ApiController : BaseController
    {
        public static string MainConnection = ConfigurationManager.AppSettings["MainConnection"];

        // GET: Api
        public ActionResult Index()
        {
            return View();
        }






        [HttpGet]
        public ActionResult ResetPassword(String PamCode)
        {
            Result rr = new Result();
            try
            {

                SqlConnection conn = new SqlConnection(MainConnection);
                String sql = "[TransactionUser]";
                SqlCommand cmd = new SqlCommand(sql, conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.Add("@Param", "ResetPassword");
                cmd.Parameters.Add("@Code", PamCode);
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


        [HttpGet]
        public ActionResult SendEmail() {
            Result rr = new Result();
            try
            {
                SmtpClient smtpClient = new SmtpClient();
                //"mailsmtp.id.etanabiotech.com", 25
                //SmtpClient smtpClient = new SmtpClient("outlook.office365.com", 587);

                smtpClient.Host = "smtp.office365.com";
                smtpClient.Port = 587;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential("cahyo.prabowo@id.etanabiotech.com", "B3rantakan");
                smtpClient.EnableSsl = true;
                MailMessage message = new MailMessage();
                message.From = new MailAddress("cahyo.prabowo@id.etanabiotech.com", "SFA System");
                message.To.Add("cahyoprabowooo@gmail.com");
                message.Subject = "Tester Subject";
                message.Body = "<h1>Tester Send Email</h1>";
                message.IsBodyHtml = true;
                smtpClient.Send(message);
                smtpClient.Dispose();
                message.Dispose();
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


        [HttpPost]
        public ActionResult Login()
        {
            Result rr = new Result();
            try
            {
                List<User> Res = new List<User>();
                String Nik = Request["Nik"].ToString();
                String Password = Request["Password"].ToString();
                SqlConnection conn = new SqlConnection(MainConnection);
                String Sql = "LoginUser";
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
                        User us = new User();
                        us.Code = dr["Code"].ToString();
                        us.Email = dr["Email"].ToString();
                        us.Gender = dr["Gender"].ToString();
                        us.Id = dr["Id"].ToString();
                        us.Name = dr["Name"].ToString();
                        us.Role = dr["Role"].ToString();
                        us.Token = dr["UserToken"].ToString();
                        us.Year = dr["Year"].ToString();
                        us.Month = dr["Month"].ToString();
                        us.Week = dr["Week"].ToString();
                        us.IdWeek = dr["IdWeek"].ToString();
                        us.Images = dr["Images"].ToString();
                        us.Phone = dr["Phone"].ToString();

                        Res.Add(us);
                    }

                    rr.Message = "Success";
                    rr.Status = 1;
                    rr.Return = Res;
                }
                else
                {
                    rr.Message = "Periksa Kembali User Dan Password Anda !";
                    rr.Status = 0;
                    rr.Return = null;
                }

                conn.Close();
                conn.Dispose();
            }
            catch (Exception ex)
            {

                rr.Message = ex.Message;
                rr.Status = 0;
                rr.Return = null;
            }
            return new JsonResult()
            {
                Data = rr,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };



        }


        [HttpGet]
        public ActionResult GetPlanToday(String PamCode) {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListPlan> Res = new List<ListPlan>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "TransactionPlan";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@PamCode", PamCode);
                    cmd.Parameters.Add("@Param", "PlanToday");
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



               


            }
            else
            {
                rr.Message = "Invalid Token";
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


        [HttpGet]
        public ActionResult GetPlanByWeek(String PamCode,String WeekOfMonth)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListPlan> Res = new List<ListPlan>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "TransactionPlan";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@PamCode", PamCode);
                    cmd.Parameters.Add("@Param", "PlanNotCall");
                    cmd.Parameters.Add("@WeekOfMonth", WeekOfMonth);
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






            }
            else
            {
                rr.Message = "Invalid Token";
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



        [HttpGet]
        public ActionResult GetCallByPAM(String PamCode, String Month)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListPlan> Res = new List<ListPlan>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[TransactionCall]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@PamCode", PamCode);
                    cmd.Parameters.Add("@Param", "GetCallByPAM");
                    cmd.Parameters.Add("@Month", Month);
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListPlan ls = new ListPlan();
                            ls.IdCall = dr["IdCall"].ToString();
                            ls.IdCustomer = dr["IdCustomer"].ToString();
                            ls.CustomerName = dr["CustomerName"].ToString();
                            ls.OutletName = dr["OutletName"].ToString();
                            ls.Date = dr["Date"].ToString();
                            ls.Time = dr["Time"].ToString();
                            ls.Images = dr["Images"].ToString();
                            ls.IdTerritoryCoverage = dr["IdTerritoryCoverage"].ToString();
                            ls.CallType = dr["CallType"].ToString();
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






            }
            else
            {
                rr.Message = "Invalid Token";
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

        [HttpGet]
        public ActionResult GetTotalPlanNotCall(String PamCode)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListPlan> Res = new List<ListPlan>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "TransactionPlan";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@PamCode", PamCode);
                    cmd.Parameters.Add("@Param", "TotalPlanNotCall");
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListPlan ls = new ListPlan();
                            ls.TotalPlan = dr["TotalPlan"].ToString();
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






            }
            else
            {
                rr.Message = "Invalid Token";
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



        [HttpGet]
        public ActionResult GetPendingCustomer(String PamCode)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListPlan> Res = new List<ListPlan>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[TransactionCustomer]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Creator", PamCode);
                    cmd.Parameters.Add("@Param", "ListPending");
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListPlan ls = new ListPlan();
                            ls.CustomerName = dr["CustomerName"].ToString();
                            ls.Date = dr["Date"].ToString();
                            ls.IdCustomer = dr["Id"].ToString();
                            ls.Images = dr["ImageCustomer"].ToString();
                            ls.Time = dr["Time"].ToString();
                            ls.StatusApproval = dr["StatusApproval"].ToString();
                            ls.CodeStatus = dr["CodeStatus"].ToString();
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






            }
            else
            {
                rr.Message = "Invalid Token";
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

        public ActionResult uploadFile(HttpPostedFileBase file, string baseFolderPath, string fileName)
        {
            DirectoryInfo directoryInfo = new DirectoryInfo(baseFolderPath);
            if (!directoryInfo.Exists)
                directoryInfo.Create();
            try
            {
                file.SaveAs(directoryInfo + fileName);
                Dictionary<string, string> Message = new Dictionary<string, string>();
                Message["result"] = "Sukses!";

                return new JsonResult()
                {
                    Data = Message,
                    MaxJsonLength = Int32.MaxValue,
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };

            }
            catch (Exception ex)
            {
                Dictionary<string, string> Message = new Dictionary<string, string>();
                Message["ImageName"] = "Sukses!";

                return new JsonResult()
                {
                    Data = ex.Message,
                    MaxJsonLength = Int32.MaxValue,
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };

            }
            Dictionary<string, string> Messagesd = new Dictionary<string, string>();
            Messagesd["result"] = "Sukses!";

            return new JsonResult()
            {
                Data = Messagesd,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpGet]
        public String DeleteImageCall()
        {
            String Return = "";
            try
            {
                string path = "~/Images/Calls/";
                string filePath = this.Server.MapPath(path);
                var dir = new DirectoryInfo(filePath);
                dir.Attributes = dir.Attributes & ~FileAttributes.ReadOnly;
                dir.Delete(true);

                if (!System.IO.Directory.Exists(this.Server.MapPath(path)))
                {
                    System.IO.Directory.CreateDirectory(this.Server.MapPath(path));
                }

                Return = "Success";

            }
            catch (Exception ex)
            {

                Return = ex.Message;
            }

            return Return;


        }


        [HttpPost]
        public ActionResult UploadImageCall(HttpPostedFileBase file)
        {
            Result rr = new Result();
            try
            {
                DateTime today = DateTime.Now;
                String fileExtension = Path.GetExtension(file.FileName);
                string dateTimeNow = Regex.Replace(DateTime.Now.ToString(), "[ :/]", string.Empty);
                string fileName = "upload_" + dateTimeNow + fileExtension;
                string filePath = this.Server.MapPath("~/Images/Calls/");
                var res = uploadFile(file, filePath, fileName);
                rr.Return = null;
                rr.Message = fileName;
                rr.Status = 1;
          
            }
            catch (Exception ex)
            {

                rr.Return = null;
                rr.Message = ex.Message;
                rr.Status = 1;
            }

            return new JsonResult()
            {
                Data = rr,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };


        }


        [HttpGet]
        public ActionResult GetPerfomance(String PamCode)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListPerfomance> Res = new List<ListPerfomance>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "GetPerfomance";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@PamCode", PamCode);
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListPerfomance ls = new ListPerfomance();
                            ls.TotalCoverage = dr["TotalCoverage"].ToString();
                            ls.TargetCall = dr["TargetCall"].ToString();
                            ls.TotalPlan = dr["TotalPlan"].ToString();
                            ls.Perfomance = dr["Perfomance"].ToString();
                            ls.NotPerfomance = dr["NotPerfomance"].ToString();
                            ls.TotalCall = dr["TotalCall"].ToString();
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






            }
            else
            {
                rr.Message = "Invalid Token";
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



        [HttpGet]
        public ActionResult GetTotalSegmentationPAM(String PamCode)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListPerfomance> Res = new List<ListPerfomance>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[TransactionTerritoryCoverage]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@PamCode", PamCode);
                    cmd.Parameters.Add("@Param", "GetTotalSegmentationPAM");
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListPerfomance ls = new ListPerfomance();
                            ls.TotalAC = dr["TotalAC"].ToString();
                            ls.TotalP = dr["TotalP"].ToString();
                            ls.TotalR = dr["TotalR"].ToString();
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






            }
            else
            {
                rr.Message = "Invalid Token";
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


        [HttpGet]
        public ActionResult GetTotalSegmentationPAMNew(String PamCode)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<GetTotalSegmentationNEW> Res = new List<GetTotalSegmentationNEW>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[TransactionTerritoryCoverage]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@PamCode", PamCode);
                    cmd.Parameters.Add("@Param", "GetTotalSegmentationNEW");
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            GetTotalSegmentationNEW ls = new GetTotalSegmentationNEW();
                            ls.Code = dr["Code"].ToString();
                            ls.Name = dr["Name"].ToString();
                            ls.Total = dr["Total"].ToString();
                            ls.Visit = dr["Visit"].ToString();
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






            }
            else
            {
                rr.Message = "Invalid Token";
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



        [HttpGet]
        public ActionResult GetTotalCallUnPlan(String PamCode)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListPerfomance> Res = new List<ListPerfomance>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[TransactionCall]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Creator", PamCode);
                    cmd.Parameters.Add("@Param", "TotalCallUnPlanPerDay");
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListPerfomance ls = new ListPerfomance();
                            ls.TotalCall = dr["TotalCall"].ToString();
                            ls.Available = dr["Available"].ToString();
                            ls.Quota = dr["Quota"].ToString();
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

            }
            else
            {
                rr.Message = "Invalid Token";
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


        [HttpPost]
        public ActionResult InsertPlan()
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), Request["PamCode"].ToString()))
            {
                try
                {
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String Sql = "[TransactionPlan]";
                    SqlCommand cmd = new SqlCommand(Sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "InsertPlan");
                    cmd.Parameters.Add("@IdTerritoryCoverage", Request["IdTerritoryCoverage"].ToString());
                    cmd.Parameters.Add("@Date", Request["Date"].ToString());
                    cmd.Parameters.Add("@Time", Request["Time"].ToString());
                    cmd.Parameters.Add("@Creator", Request["PamCode"].ToString());
                    cmd.Parameters.Add("@Status", Request["Status"].ToString());
                    cmd.Parameters.Add("@IdWeekOfMonth", Request["IdWeekOfMonth"].ToString());
                    cmd.Parameters.Add("@IdOutlet", Request["IdOutlet"].ToString());
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                    conn.Dispose();


                    rr.Message = "Success Insert";
                    rr.Return = null;
                    rr.Status = 1;


                }
                catch (Exception ex)
                {

                    rr.Message = ex.Message;
                    rr.Return = null;
                    rr.Status = 0;
                }
            }
            else
            {
                rr.Message = "Invalid Token";
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

        [HttpPost]
        public ActionResult InsertEtcp()
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), Request["PamCode"].ToString()))
            {
                try
                {
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String Sql = "[TransactionTerritoryCoverage]";
                    SqlCommand cmd = new SqlCommand(Sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "InsertEtcp");
                    cmd.Parameters.Add("@IdCustomer", Request["IdCustomer"].ToString());
                    cmd.Parameters.Add("@PamCode", Request["PamCode"].ToString());
                    cmd.Parameters.Add("@Status", Request["Status"].ToString());
                   
             
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                    conn.Dispose();


                    rr.Message = "Success Insert";
                    rr.Return = null;
                    rr.Status = 1;


                }
                catch (Exception ex)
                {

                    rr.Message = ex.Message;
                    rr.Return = null;
                    rr.Status = 0;
                }
            }
            else
            {
                rr.Message = "Invalid Token";
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



        [HttpPost]
        public ActionResult UpdateDisplayPicturePAM()
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), Request["PamCode"].ToString()))
            {
                try
                {
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String Sql = "[TransactionUser]";
                    SqlCommand cmd = new SqlCommand(Sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "UpdateDisplayPicture");
                    cmd.Parameters.Add("@Id", Request["Id"].ToString());
                    cmd.Parameters.Add("@Creator", Request["PamCode"].ToString());
                    cmd.Parameters.Add("@Image", Request["Image"].ToString());


                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                    conn.Dispose();


                    rr.Message = "Success Insert";
                    rr.Return = null;
                    rr.Status = 1;


                }
                catch (Exception ex)
                {

                    rr.Message = ex.Message;
                    rr.Return = null;
                    rr.Status = 0;
                }
            }
            else
            {
                rr.Message = "Invalid Token";
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





        [HttpPost]
        public ActionResult InsertCall()
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), Request["PamCode"].ToString()))
            {
                try
                {
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String Sql = "[TransactionCall]";
                    SqlCommand cmd = new SqlCommand(Sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "Insert");
                    cmd.Parameters.Add("@IdTerritoryCoverage", Request["IdTerritoryCoverage"].ToString());
                    cmd.Parameters.Add("@IdWeekOfMonth", Request["IdWeekOfMonth"].ToString());
                    cmd.Parameters.Add("@Longitude", Request["Longitude"].ToString());
                    cmd.Parameters.Add("@Latitude", Request["Latitude"].ToString());
                    cmd.Parameters.Add("@IdCallPlan", Request["IdCallPlan"].ToString());
                    cmd.Parameters.Add("@IdProduct", Request["IdProduct"].ToString());
                    cmd.Parameters.Add("@Activity", Request["Activity"].ToString());
                    cmd.Parameters.Add("@Remarks", Request["Remarks"].ToString());
                    cmd.Parameters.Add("@Creator", Request["PamCode"].ToString());
                    cmd.Parameters.Add("@IdCallType", Request["IdCallType"].ToString());
                    cmd.Parameters.Add("@Images", Request["ImageName"].ToString());
                    cmd.Parameters.Add("@IdOutlet", Request["IdOutlet"].ToString());
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                    conn.Dispose();


                    rr.Message = "Success Insert";
                    rr.Return = null;
                    rr.Status = 1;


                }
                catch (Exception ex)
                {

                    rr.Message = ex.Message;
                    rr.Return = null;
                    rr.Status = 0;
                }
            }
            else
            {
                rr.Message = "Invalid Token";
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

        [HttpPost]
        public ActionResult UploadImageCustomer(HttpPostedFileBase file)
        {
            Result rr = new Result();
            try
            {
                DateTime today = DateTime.Now;
                String fileExtension = Path.GetExtension(file.FileName);
                string dateTimeNow = Regex.Replace(DateTime.Now.ToString(), "[ :/]", string.Empty);
                string fileName = "upload_" + dateTimeNow + fileExtension;
                string filePath = this.Server.MapPath("~/Images/Customer/");
                var res = uploadFile(file, filePath, fileName);
                rr.Return = null;
                rr.Message = fileName;
                rr.Status = 1;

            }
            catch (Exception ex)
            {

                rr.Return = null;
                rr.Message = ex.Message;
                rr.Status = 1;
            }

            return new JsonResult()
            {
                Data = rr,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };


        }



        [HttpPost]
        public ActionResult UploadImagePAM(HttpPostedFileBase file)
        {
            Result rr = new Result();
            try
            {
                DateTime today = DateTime.Now;
                String fileExtension = Path.GetExtension(file.FileName);
                string dateTimeNow = Regex.Replace(DateTime.Now.ToString(), "[ :/]", string.Empty);
                string fileName = "upload_" + dateTimeNow + fileExtension;
                string filePath = this.Server.MapPath("~/Images/Pam/");
                var res = uploadFile(file, filePath, fileName);
                rr.Return = null;
                rr.Message = fileName;
                rr.Status = 1;

            }
            catch (Exception ex)
            {

                rr.Return = null;
                rr.Message = ex.Message;
                rr.Status = 1;
            }

            return new JsonResult()
            {
                Data = rr,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };


        }



        [HttpPost]
        public ActionResult InsertCustomer()
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), Request["PamCode"].ToString()))
            {
                try
                {
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String Sql = "[TransactionCustomer]";
                    SqlCommand cmd = new SqlCommand(Sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "Insert");
                    cmd.Parameters.Add("@CustomerName", Request["CustomerName"].ToString());
                    cmd.Parameters.Add("@DateOfBirth", Request["DateOfBirth"].ToString());
                    cmd.Parameters.Add("@CustomerType", Request["CustomerType"].ToString());
                    cmd.Parameters.Add("@PhoneNumber", Request["PhoneNumber"].ToString());
                    cmd.Parameters.Add("@Email", Request["Email"].ToString());
                    cmd.Parameters.Add("@Specialization", Request["Specialization"].ToString());
                    cmd.Parameters.Add("@Address", Request["Address"].ToString());
                    cmd.Parameters.Add("@Area", Request["Area"].ToString());
                    cmd.Parameters.Add("@Outlet1", Request["Outlet1"].ToString());
                    cmd.Parameters.Add("@Outlet2", Request["Outlet2"].ToString());
                    cmd.Parameters.Add("@Outlet3", Request["Outlet3"].ToString());
                    cmd.Parameters.Add("@Hobby", Request["Hobby"].ToString());
                    cmd.Parameters.Add("@Religion", Request["Religion"].ToString());
                    cmd.Parameters.Add("@DateOfMarriage", Request["DateOfMarriage"].ToString());
                    cmd.Parameters.Add("@SpouseName", Request["SpouseName"].ToString());
                    cmd.Parameters.Add("@ChildName1", Request["ChildName1"].ToString());
                    cmd.Parameters.Add("@ChildName2", Request["ChildName2"].ToString());
                    cmd.Parameters.Add("@DateOfBirthSpose", Request["DateOfBirthSpose"].ToString());
                    cmd.Parameters.Add("@DateofBirthChild1", Request["DateofBirthChild1"].ToString());
                    cmd.Parameters.Add("@DateOfBirthChild2", Request["DateOfBirthChild2"].ToString());
                    cmd.Parameters.Add("@Note", Request["Note"].ToString());
                    cmd.Parameters.Add("@Creator", Request["Creator"].ToString());
                    cmd.Parameters.Add("@Title", Request["Title"].ToString());
                    cmd.Parameters.Add("@Segmentation", Request["Segmentation"].ToString());
                    cmd.Parameters.Add("@Status", Request["Status"].ToString());
                    cmd.Parameters.Add("@Images", Request["Images"].ToString());
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                    conn.Dispose();


                    rr.Message = "Success Insert";
                    rr.Return = null;
                    rr.Status = 1;


                }
                catch (Exception ex)
                {

                    rr.Message = ex.Message;
                    rr.Return = null;
                    rr.Status = 0;
                }
            }
            else
            {
                rr.Message = "Invalid Token";
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

        [HttpPost]
        public ActionResult DeleteTerritoryCoverage()
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), Request["PamCode"].ToString()))
            {
                try
                {
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String Sql = "[TransactionTerritoryCoverage]";
                    SqlCommand cmd = new SqlCommand(Sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "DeleteTerritoryCoverage");
                    cmd.Parameters.Add("@Id", Request["Id"].ToString());
                    cmd.Parameters.Add("@Creator", Request["PamCode"].ToString());
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                    conn.Dispose();


                    rr.Message = "Success Update";
                    rr.Return = null;
                    rr.Status = 1;


                }
                catch (Exception ex)
                {

                    rr.Message = ex.Message;
                    rr.Return = null;
                    rr.Status = 0;
                }
            }
            else
            {
                rr.Message = "Invalid Token";
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


        [HttpPost]
        public ActionResult UpdateCustomer()
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), Request["PamCode"].ToString()))
            {
                try
                {
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String Sql = "[TransactionCustomer]";
                    SqlCommand cmd = new SqlCommand(Sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "UpdateCustomer");
                    cmd.Parameters.Add("@CustomerName", Request["CustomerName"].ToString());
                    cmd.Parameters.Add("@DateOfBirth", Request["DateOfBirth"].ToString());
                    cmd.Parameters.Add("@CustomerType", Request["CustomerType"].ToString());
                    cmd.Parameters.Add("@PhoneNumber", Request["PhoneNumber"].ToString());
                    cmd.Parameters.Add("@Email", Request["Email"].ToString());
                    cmd.Parameters.Add("@Specialization", Request["Specialization"].ToString());
                    cmd.Parameters.Add("@Address", Request["Address"].ToString());
                    cmd.Parameters.Add("@Area", Request["Area"].ToString());
                    cmd.Parameters.Add("@Outlet1", Request["Outlet1"].ToString());
                    cmd.Parameters.Add("@Outlet2", Request["Outlet2"].ToString());
                    cmd.Parameters.Add("@Outlet3", Request["Outlet3"].ToString());
                    cmd.Parameters.Add("@Hobby", Request["Hobby"].ToString());
                    cmd.Parameters.Add("@Religion", Request["Religion"].ToString());
                    cmd.Parameters.Add("@DateOfMarriage", Request["DateOfMarriage"].ToString());
                    cmd.Parameters.Add("@SpouseName", Request["SpouseName"].ToString());
                    cmd.Parameters.Add("@ChildName1", Request["ChildName1"].ToString());
                    cmd.Parameters.Add("@ChildName2", Request["ChildName2"].ToString());
                    cmd.Parameters.Add("@DateOfBirthSpose", Request["DateOfBirthSpose"].ToString());
                    cmd.Parameters.Add("@DateofBirthChild1", Request["DateofBirthChild1"].ToString());
                    cmd.Parameters.Add("@DateOfBirthChild2", Request["DateOfBirthChild2"].ToString());
                    cmd.Parameters.Add("@Note", Request["Note"].ToString());
                    cmd.Parameters.Add("@Creator", Request["Creator"].ToString());
                    cmd.Parameters.Add("@Title", Request["Title"].ToString());
                    cmd.Parameters.Add("@Segmentation", Request["Segmentation"].ToString());
                    //cmd.Parameters.Add("@Status", Request["Status"].ToString());
                    cmd.Parameters.Add("@Images", Request["Images"].ToString());
                    cmd.Parameters.Add("@Id", Request["Id"].ToString());
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                    conn.Dispose();


                    rr.Message = "Success Update";
                    rr.Return = null;
                    rr.Status = 1;


                }
                catch (Exception ex)
                {

                    rr.Message = ex.Message;
                    rr.Return = null;
                    rr.Status = 0;
                }
            }
            else
            {
                rr.Message = "Invalid Token";
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


        public string GetRandomName() {

            string Result = "";
            SqlConnection conn = new SqlConnection(MainConnection);
            String sql = "SELECT TOP 1 * FROM [vw_GetToken]";
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.CommandType = System.Data.CommandType.Text;
            conn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    Result = dr["Token"].ToString();
                }
            }
            conn.Close();
            conn.Dispose();
            return Result;



        }





        [HttpGet]
        public ActionResult GetEtcpPlanPAM(String PamCode,String IdWeek)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListPlan> Res = new List<ListPlan>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[TransactionTerritoryCoverage]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "GetEtcpPlanPAM");
                    cmd.Parameters.Add("@PamCode", PamCode);
                    cmd.Parameters.Add("@IdWeek", IdWeek);

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






            }
            else
            {
                rr.Message = "Invalid Token";
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



        [HttpPost]
        public ActionResult DoUpdatePassword()
        {

            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), Request["PamCode"].ToString()))
            {
                try
                {
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[TransactionUser]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "UpdatePassword");
                    cmd.Parameters.Add("@Creator", Request["PamCode"].ToString());
                    cmd.Parameters.Add("@Id", Request["Id"].ToString());
                    cmd.Parameters.Add("@NewPassword", Request["NewPassword"].ToString());
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

            }
            else
            {
                rr.Status = 0;
                rr.Return = null;
                rr.Message = "Invalid Token";
            }

            return new JsonResult()
            {
                Data = rr,
                MaxJsonLength = Int32.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }



        [HttpGet]
        public ActionResult GetCustomerNoETCP(String PamCode,String Search )
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListPlan> Res = new List<ListPlan>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[TransactionTerritoryCoverage]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "GetCustomerNoETCP");
                    cmd.Parameters.Add("@PamCode", PamCode);
                    cmd.Parameters.Add("@Search", Search);
                    

                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListPlan ls = new ListPlan();
                            ls.IdCustomer = dr["Id"].ToString();
                            ls.CustomerName = dr["CustomerName"].ToString();
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






            }
            else
            {
                rr.Message = "Invalid Token";
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


        
        public DateTime FormatDateTime(String dt,String FormatDb) {
            IFormatProvider culture = new CultureInfo("en-US", true);
            DateTime dateVal = DateTime.ParseExact(dt,
FormatDb, CultureInfo.InvariantCulture);
            return dateVal;
            
        }

        public DateTime Dt(String Input)
        {
            DateTime dtx = new DateTime();

            dtx = Convert.ToDateTime(Input.ToString());
            return dtx;
        }

        [HttpGet]
        public ActionResult GetEtcpPAM(String PamCode)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListPlan> Res = new List<ListPlan>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[TransactionTerritoryCoverage]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "GetEtcpPAM");
                    cmd.Parameters.Add("@PamCode", PamCode);

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


                            //"dd.MM.yyyy HH:mm:ss"

                            
                            ls._DateOfBirth = dr["_DateOfBirth"].ToString()!="" && dr["_DateOfBirth"].ToString()!=null ? Dt(dr["_DateOfBirth"].ToString()).ToString("yyyy-MM-dd") : ""; 
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






            }
            else
            {
                rr.Message = "Invalid Token";
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


        [HttpGet]
        public ActionResult GetPendingEtcpPAM(String PamCode)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListPlan> Res = new List<ListPlan>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[TransactionTerritoryCoverage]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "GetPendingEtcpPAM");
                    cmd.Parameters.Add("@PamCode", PamCode);

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
                            ls.Status = dr["Status"].ToString();
                            ls.StatusName = dr["StatusName"].ToString();
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






            }
            else
            {
                rr.Message = "Invalid Token";
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


        [HttpGet]
        public ActionResult GetEtcpUnPlanPAM(String PamCode, String IdWeek)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListPlan> Res = new List<ListPlan>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[TransactionTerritoryCoverage]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "GetEtcpUnPlanPAM");
                    cmd.Parameters.Add("@PamCode", PamCode);
                    cmd.Parameters.Add("@IdWeek", IdWeek);

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






            }
            else
            {
                rr.Message = "Invalid Token";
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

        [HttpPost]
        public ActionResult UpdateReasonNoCall()
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), Request["PamCode"].ToString() ))
            {

                try
                {
                    List<ListPlan> Res = new List<ListPlan>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[TransactionPlan]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "UpdateReasonNoCall");
                    cmd.Parameters.Add("@PamCode", Request["PamCode"].ToString());
                    cmd.Parameters.Add("@ReasonNoCall", Request["ReasonNoCall"].ToString());
                    cmd.Parameters.Add("@IdPlan", Request["IdPlan"].ToString());
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                    conn.Dispose();

                    rr.Message = "Success";
                    rr.Return = Res;
                    rr.Status = 1;

                }
                catch (Exception ex)
                {

                    rr.Message = ex.Message;
                    rr.Return = null;
                    rr.Status = 0;
                }






            }
            else
            {
                rr.Message = "Invalid Token";
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


        [HttpGet]
        public ActionResult GetBrochureImage(String PamCode)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListBrochure> Res = new List<ListBrochure>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[TransactionBrochure]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "GetBrochureImage");
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListBrochure ls = new ListBrochure();
                            ls.Id = dr["Id"].ToString();
                            ls.Image = dr["Image"].ToString();
                            ls.Title = dr["Title"].ToString();
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






            }
            else
            {
                rr.Message = "Invalid Token";
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


        [HttpGet]
        public ActionResult GetBrochureVideo(String PamCode)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListBrochure> Res = new List<ListBrochure>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "[TransactionBrochure]";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "GetBrochureVideo");
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListBrochure ls = new ListBrochure();
                            ls.Id = dr["Id"].ToString();
                            ls.Image = dr["Image"].ToString();
                            ls.Title = dr["Title"].ToString();
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






            }
            else
            {
                rr.Message = "Invalid Token";
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




        [HttpGet]
        public ActionResult GetPlanPeriode(String PamCode)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<PeriodePlan> Res = new List<PeriodePlan>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "TransactionPlan";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "PeriodePlan");
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            PeriodePlan ls = new PeriodePlan();
                            ls.StartDate = dr["StartDate"].ToString();
                            ls.EndDate = dr["EndDate"].ToString();
                            ls.WeekOfMonth = dr["WeekOfMonth"].ToString();
                            ls.Status = dr["Status"].ToString();
                            ls.IdWeek = dr["Id"].ToString();

                            ls.DayStartWeek = dr["DayStartWeek"].ToString();
                            ls.MonthStartWeek = dr["MonthStartWeek"].ToString();
                            ls.YearStartWeek = dr["YearStartWeek"].ToString();
                            ls.DayEndWeek = dr["DayEndWeek"].ToString();
                            ls.MonthEndWeek = dr["MonthEndWeek"].ToString();
                            ls.YearEndWeek = dr["YearEndWeek"].ToString();
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






            }
            else
            {
                rr.Message = "Invalid Token";
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




        [HttpGet]
        public ActionResult GetProducts(String PamCode)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListNameId> Res = new List<ListNameId>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "Select * From vw_GetProduct";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.Text;
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListNameId ls = new ListNameId();
                            ls.Id = dr["Id"].ToString();
                            ls.Name = dr["ProductName"].ToString();
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






            }
            else
            {
                rr.Message = "Invalid Token";
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

        [HttpGet]
        public ActionResult GetSearchOutlet(String PamCode, String Search="")
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListNameId> Res = new List<ListNameId>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "TransactionOutlet";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "SearchOutlet");
                    cmd.Parameters.Add("@Search", Search);
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListNameId ls = new ListNameId();
                            ls.Id = dr["Id"].ToString();
                            ls.Name = dr["Name"].ToString();
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
            }
            else
            {
                rr.Message = "Invalid Token";
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


        [HttpGet]
        public ActionResult GetOutletByCustomer(String PamCode, String IdTerritoryCoverage = "")
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListNameId> Res = new List<ListNameId>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "TransactionOutlet";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Param", "GetOutletByCustomer");
                    cmd.Parameters.Add("@IdTerritoryCoverage", IdTerritoryCoverage);
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListNameId ls = new ListNameId();
                            ls.Id = dr["Id"].ToString();
                            ls.Name = dr["OutletName"].ToString();
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
            }
            else
            {
                rr.Message = "Invalid Token";
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



        [HttpGet]
        public ActionResult GetCustomerType(String PamCode)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListNameId> Res = new List<ListNameId>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "Select * From CustomerTypes Where Status = 1";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.Text;
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListNameId ls = new ListNameId();
                            ls.Id = dr["Id"].ToString();
                            ls.Name = dr["Name"].ToString();
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






            }
            else
            {
                rr.Message = "Invalid Token";
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



        [HttpGet]
        public ActionResult GetSpecializations(String PamCode)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListNameId> Res = new List<ListNameId>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "Select * From Specializations Where Status = 1 ";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.Text;
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListNameId ls = new ListNameId();
                            ls.Id = dr["Code"].ToString();
                            ls.Name = dr["Name"].ToString();
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






            }
            else
            {
                rr.Message = "Invalid Token";
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


        [HttpGet]
        public ActionResult GetMasterFields(String PamCode)
        {
            Result rr = new Result();
            if (!string.IsNullOrEmpty(GetToken()) && IsValidToken(GetToken(), PamCode))
            {

                try
                {
                    List<ListNameId> Res = new List<ListNameId>();
                    SqlConnection conn = new SqlConnection(MainConnection);
                    String sql = "Select * From vw_MasterFields ";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    cmd.CommandType = System.Data.CommandType.Text;
                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    Regex rgx = new Regex("[^a-zA-Z0-9 -]");
                    //str = rgx.Replace(str, "");
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            ListNameId ls = new ListNameId();
                            ls.Id = dr["Id"].ToString();
                            ls.Name = rgx.Replace(dr["Name"].ToString(),"");
                            ls.Type = dr["Type"].ToString();
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






            }
            else
            {
                rr.Message = "Invalid Token";
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