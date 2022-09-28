function showdata() {
    AlertLoading();
    $.ajax({
        url: baseUrl + '/Customer/GetEtcp?Param=GetAllCustomer',
        type: 'GET',
        success: function (data) {
            var obj = data.Return;
            if (data.Status == "1") {
                console.log("Data", data);
                var content = [];

                for (var i = 0; i < obj.length; i++) {
                    var Name = obj[i].CustomerName;
                    var Specialty = obj[i]._IdSpecialty;
                    var Segmentation = obj[i]._IdSegmentation;
                    var CustomerTypeName = obj[i].CustomerTypeName;
                    var Button = "<button class='btn btn-primary UpdateParticipant' onclick='showdetail(" + obj[i].IdTerritoryCoverage + ")'  data-bs-toggle='modal' data-bs-target='.myModal'> View  </button>";
                    content.push([obj[i].IdCustomer,Name, Specialty, Segmentation, CustomerTypeName,  Button]);
                }


                CloseLoading();


                $('.ListCustomer').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'excel'
                    ],
                    data: content,
                    deferRender: true,
                    scrollY: 900,
                    scrollCollapse: true,
                    scroller: true
                });


            } else {
                alertError(data.Message);
            }
        }
    });
}


function showdetail(Id) {
    $.ajax({
        url: baseUrl + '/Customer/GetEtcp?Param=GetDetailCustomer&&Id=' + Id,
        type: 'GET',
        success: function (data) {
            var obj = data.Return;
            if (data.Status == "1") {
                console.log("Data", data);
                var content = [];

                //for (var i = 0; i < obj.length; i++) {
                //    var Name = obj[i].CustomerName;
                //    var Specialty = obj[i]._IdSpecialty;
                //    var Segmentation = obj[i]._IdSegmentation;
                //    var PAM = obj[i].PAMName;
                //    var ASM = obj[i].ASMName;
                //    var RSM = obj[i].RSMName;
                //    var Button = "<button class='btn btn-primary UpdateParticipant'  data-bs-toggle='modal' data-bs-target='.myModal'> View  </button>";
                //    content.push([Name, Specialty, Segmentation, PAM, ASM, RSM, Button]);
                //}

                $(".CustomerName").html(obj[0].CustomerName == "" ? "-" : obj[0].CustomerName);
                $(".Specialization").html(obj[0].SpecializationName == "" ? "-" : obj[0].SpecializationName);
                $(".CustomerType").html(obj[0].CustomerTypeName == "" ? "-" : obj[0].CustomerTypeName);
                $(".PhoneNumber").html(obj[0]._PhoneNumber == "" ? "-" : obj[0]._PhoneNumber);
                $(".Email").html(obj[0]._Email == "" ? "-" : obj[0]._Email);
                $(".Segmentation").html(obj[0].SegmentationName == "" ? "-" : obj[0].SegmentationName);
                $(".DOB").html(obj[0]._DateOfBirth == "" ? "-" : obj[0]._DateOfBirth);
                $(".Religion").html(obj[0].ReligionName == "" ? "-" : obj[0].ReligionName);
                $(".Hobby").html(obj[0]._Hobby == "" ? "-" : obj[0]._Hobby);
                $(".Address").html(obj[0]._Address == "" ? "-" : obj[0]._Address);
                $(".Area").html(obj[0].AreaName == "" ? "-" : obj[0].AreaName);
                $(".Outlet1").html(obj[0]._OutletName1 == "" ? "-" : obj[0]._OutletName1);
                $(".Outlet2").html(obj[0]._OutletName2 == "" ? "-" : obj[0]._OutletName2);
                $(".Outlet3").html(obj[0]._OutletName3 == "" ? "-" : obj[0]._OutletName3);
                $(".Outlet3").html(obj[0]._OutletName3 == "" ? "-" : obj[0]._OutletName3);
                $(".DOM").html(obj[0]._DateOfMarriage == "" ? "-" : obj[0]._DateOfMarriage);
                $(".SpouseName").html(obj[0]._Husban_Wife_Name == "" ? "-" : obj[0]._Husban_Wife_Name);
                $(".DOBSpouse").html(obj[0]._Husband_Wife_Birth == "" ? "-" : obj[0]._Husband_Wife_Birth);
                $(".DOBC1").html(obj[0]._Child_Birth_1 == "" ? "-" : obj[0]._Child_Birth_1);
                $(".DOBC2").html(obj[0]._Child_Birth_2 == "" ? "-" : obj[0]._Child_Birth_2);
                $(".CN1").html(obj[0]._Child_Name_1 == "" ? "-" : obj[0]._Child_Name_1);
                $(".CN2").html(obj[0]._Child_Name_2 == "" ? "-" : obj[0]._Child_Name_2);
                $(".Note").html(obj[0]._Note == "" ? "-" : obj[0]._Note);

                var ViewImage = obj[0]._Images == "" ? baseUrlImage + "Customer/doctor.jpg" : baseUrlImage + "Customer/" + obj[0]._Images;
                var Img = '<img src="' + ViewImage + '" style="width: 200px; " class="rounded float - start" />';
                $(".ImageCustomer").html(Img)

                //callback(content)

                //$('.ListCoverage').DataTable({
                //    data: content,
                //    deferRender: true,
                //    scrollY: 900,
                //    scrollCollapse: true,
                //    scroller: true
                //});


            } else {
                alertError(data.Message);
            }
        }
    });
}


$(document).ready(function () {
    showdata()

})