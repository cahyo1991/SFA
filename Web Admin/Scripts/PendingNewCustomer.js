function showdata() {
    $.ajax({
        url: baseUrl + '/Customer/GetEtcp?Param=GetCustomerPending',
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
                    var CustomerTypeName = obj[i].PAMName;
                    var Button = "<button class='btn btn-primary UpdateParticipant' onclick='showdetail(" + obj[i].IdTerritoryCoverage + ")'  data-bs-toggle='modal' data-bs-target='.myModal'> View  </button>";
                    content.push([obj[i].IdCustomer, Name, Specialty, Segmentation, CustomerTypeName, Button,
                        "<input type='checkbox' id='CheckBoxTC_" + i + "' class='CheckBoxTC' value='" + obj[i].IdCustomer + "'>"
                    ]);
                }





                $('.ListCustomer').DataTable({
                    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
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
                $(".IdCustomer").val(Id);
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

function ApprovalMulti(Id, IdStatusApproval) {

    $.ajax({
        url: baseUrl + "/Customer/Approvals?IdStatusApproval=" + IdStatusApproval + "&&Type=Customer&&Id=" + Id,
        type: 'GET',
        success: function (data) {
            var Status = data.Status;

            if (Status == "1") {
                console.log("Id " + Id + " Berhasil Di Update")
            } else {
                alertError(data.Message, "/Customer/PendingNewCustomer");
            }
        }
    })
}

function Approval(Id, IdStatusApproval) {

    $.ajax({
        url: baseUrl + "/Customer/Approvals?IdStatusApproval=" + IdStatusApproval + "&&Type=Customer&&Id=" + Id,
        type: 'GET',
        success: function (data) {
            var Status = data.Status;

            if (Status == "1") {
                alertSuccess("Data Berhasil Di Update !", "/Customer/PendingNewCustomer");
            } else {
                alertError(data.Message, "/Customer/PendingNewCustomer");
            }
        }
    })
}

var CekCoverage = 0;
var LengthCoverage = 0;



function _CekCoverage(callback) {
    callback();
    console.log(CekCoverage + "-" + LengthCoverage);
}

function cekSendCoverage() {
    if (CekCoverage == LengthCoverage) {

        alertSuccess("Data Berhasil Di Update !", "/Customer/PendingNewCustomer");


    }
}

$(document).ready(function () {
    $(".checkall").change(function () {
        if ($(".checkall").is(':checked')) {

            $(".CheckBoxTC").prop('checked', true);
        } else {
            $(".CheckBoxTC").prop('checked', false);
        }
    })

    $(".approveSelected").click(function () {
        AlertLoading();
        var data = $(".ListCustomer").DataTable().column(0).data();
        LengthCoverage = data.length;
        setTimeout(function () {
            $.each(data, function (i, v) {
                _CekCoverage(function () {
                    CekCoverage = CekCoverage + 1;
                    cekSendCoverage();
                })


                var checked = "#CheckBoxTC_" + i;
                if ($(checked).is(':checked')) {
                    var Id = $(checked).val();
                    var IdStatusApproval = Role == "ASM" ? "3" : Role == "RSM" ? "1" : "1";
                    ApprovalMulti(Id, IdStatusApproval);
                }

            })
        }, 3000);
    })

    showdata();



    $(".approve").click(function () {
        var Id = $(".IdCustomer").val();
        var IdStatusApproval = Role == "ASM" ? "3" : Role == "RSM" ? "1" : "1";
        Approval(Id, IdStatusApproval);
    })

    $(".reject").click(function () {
        var Id = $(".IdCustomer").val();
        Approval(Id, "0");
    })


})