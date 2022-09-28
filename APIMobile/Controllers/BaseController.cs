using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace APISFA.Controllers
{
    public class BaseController : Controller
    {
        // GET: Base
        public static string MainConnection = ConfigurationManager.AppSettings["MainConnection"];


        public string GetToken()
        {
            string token = "";


                token = Request.Headers.GetValues("Token").First();


            if (string.IsNullOrEmpty(token))
            {
                token = "0";
            }
            

            return token;
        }

        public bool IsValidToken(string token = "", string code = "")
        {

            bool res = false;

            try
            {
                SqlConnection conn = new SqlConnection(MainConnection);
                String sql = "CekToken";
                SqlCommand cmd = new SqlCommand(sql, conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.Add("@Code", code);
                cmd.Parameters.Add("@Token", token);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        if (Convert.ToInt32(dr["Cek"]) > 0)
                        {
                            res = true;
                        }
                        else
                        {
                            res = false;
                        }

                        string result = dr["Cek"].ToString();
                    }
                }
                else
                {
                    res = false;
                }
                conn.Close();
                conn.Dispose();
            }
            catch (Exception ex)
            {
                String ResponError = ex.Message;
                res = false;
                
            }


            return res;
     
        }
    }
}