using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APISFA.Models
{
    public class MasterModel
    {
    }
    public class Result
    {

        public int Status { get; set; }
        public string Message { get; set; }
        public object Return { get; set; }
    }

    public class User {

        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }

        public string Year { get; set; }

        public string Month { get; set; }
        public string Gender { get; set; }
        public string Token { get; set; }
        public string Week { get; set; }

        public string IdWeek { get; set; }

        public string Images { get; set; }

        public string Phone { get; set; }


    }

    public class ListBrochure {

        public string Id { get; set; }
        public string Title { get; set; }

        public string Image { get; set; }
        public string Type { get; set; }

    }
    public class ListPlan {

        public string IdPlan { get; set; }
        public string IdCustomer { get; set; }
        public string CustomerName { get; set; }
        public string OutletName { get; set; }
        public string Date { get; set; }

        public string Time { get; set; }

        public string Images { get; set; }

        public string IdTerritoryCoverage { get; set; }

        public string StatusApproval { get; set; }

        public string CodeStatus { get; set; }

        public string StatusPlanCall { get; set; }
        public string TotalPlan { get; set; }

        public string Status { get; set; }
        public string StatusName { get; set; }

        public string IdCall { get; set; }
        public string CallType { get; set; }

        public string IdSegmentation { get; set; }

        //detail customer model 
        public string _Address { get; set; }
        public string _Child_Birth_1 { get; set; }
        public string _Child_Birth_2 { get; set; }
        public string _Child_Name_1 { get; set; }
        public string _Child_Name_2 { get; set; }
        public string _CustomerName { get; set; }
        public string _DateOfBirth { get; set; }
        public string _DateOfMarriage { get; set; }
        public string _Email { get; set; }
        public string _Hobby { get; set; }
        public string _Husban_Wife_Name { get; set; }
        public string _Husband_Wife_Birth { get; set; }
        public string _Id { get; set; }
        public string _IdCustomerType { get; set; }
        public string _IdDoctorTitles { get; set; }
        public string _IdReligion { get; set; }
        public string _IdSegmentation { get; set; }
        public string _IdSpecialty { get; set; }
        public string _Images { get; set; }
        public string _Note { get; set; }
        public string _OutletId_1 { get; set; }
        public string _OutletId_2 { get; set; }
        public string _OutletId_3 { get; set; }
        public string _PhoneNumber { get; set; }
        public string _ProvinceCode { get; set; }
        public string _OutletName1 { get; set; }
        public string _OutletName2 { get; set; }
        public string _OutletName3 { get; set; }

    }


    public class GetTotalSegmentationNEW {

        public string Code { get; set; }

        public string Name { get; set; }

        public string Visit { get; set; }

        public string Total { get; set; }

    }

    public class ListPerfomance {

        public string TotalCoverage { get; set; }
        public string TargetCall { get; set; }

        public string TotalPlan { get; set; }
        public string TotalCall { get; set; }
        public string Perfomance { get; set; }
        public string NotPerfomance { get; set; }

        public string Quota { get; set; }

        public string Available { get; set; }

        public string TotalAC { get; set; }

        public string TotalP { get; set; }
        public string TotalR { get; set; }

    }
    public class PeriodePlan {

        public string  StartDate { get; set; }
        public string EndDate { get; set; }
        public string WeekOfMonth { get; set; }

        public string Status { get; set; }

        public string IdWeek { get; set; }

        public string DayStartWeek { get; set; }
        public string MonthStartWeek { get; set; }
        public string YearStartWeek { get; set; }

        public string DayEndWeek { get; set; }
        public string MonthEndWeek { get; set; }
        public string YearEndWeek { get; set; }

    }

    public class ListNameId {

        public string Id { get; set; }
        public string Name { get; set; }

        public string Type { get; set; }

    }

}