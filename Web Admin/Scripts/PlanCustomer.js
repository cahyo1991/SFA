
function showdata(callback) {
    $.ajax({
        //url: baseUrl + '/Customer/GetEtcp?Param=GetETCP',
        url: baseUrl + '/Customer/GetPlan?Param=GetPendingPlan',
        type: 'GET',
        success: function (data) {
            var obj = data.Return;
            if (data.Status == "1") {
                console.log("Data", data);
                var content = [];
                var IdStatusApproval = Role == "ASM" ? "3" : Role == "RSM" ? "1" : "1";

                for (var i = 0; i < obj.length; i++) {
                    //var Name = obj[i].CustomerName;
                    //var CallType = obj[i].CallType;
                    //var OutletName = obj[i].OutletName;
                    //var Time = obj[i].Date + "-" + obj[i].Time;
                    //var ASM = obj[i].ASMName;
                    //var RSM = obj[i].RSMName;
                    //var PAM = obj[i].PAMName;StatusName
                    //var MonthOfYear = obj[i].MonthOfYear;
                    //var Button = "<button class='btn btn-primary UpdateParticipant' onclick='showdetails(" + obj[i].IdCall + ")'  data-bs-toggle='modal' data-bs-target='.myModal'> View  </button>";
                    var ButtonApprove = "<a class='btn btn-primary' onclick='Approval(" + obj[i].IdPlan + "," + IdStatusApproval+")' >Approve</a>";
                    var ButtonReject = "<a class='btn btn-danger' onclick='Approval(" + obj[i].IdPlan +",0)'>Reject</a>";
                    content.push([obj[i].IdPlan, obj[i].CustomerName, obj[i].OutletName, obj[i].Date + "-" + obj[i].Time, obj[i].WeekOfMonth, obj[i].MonthOfYear
                        , obj[i].PAMName, obj[i].ASMName, obj[i].RSMName, ButtonApprove, ButtonReject,
                        "<input type='checkbox' id='CheckBoxTC_" + i + "' class='CheckBoxTC' value='" + obj[i].IdPlan + "'>"
                    ]);
                }
                callback(content)
            } else {
                alertError(data.Message);
            }
        }
    });
}


function ApprovalMulti(Id, IdStatusApproval) {

    $.ajax({
        url: baseUrl + "/Customer/Approvals?IdStatusApproval=" + IdStatusApproval + "&&Type=Plan&&Id=" + Id,
        type: 'GET',
        success: function (data) {
            var Status = data.Status;

            if (Status == "1") {
                console.log("Id " + Id + " Berhasil Di Update")
            } else {
                alertError(data.Message, "/Customer/PlanCustomer");
            }
        }
    })
}

function Approval(Id, IdStatusApproval) {

    $.ajax({
        url: baseUrl + "/Customer/Approvals?IdStatusApproval=" + IdStatusApproval + "&&Type=Plan&&Id=" + Id,
        type: 'GET',
        success: function (data) {
            var Status = data.Status;

            if (Status == "1") {
                alertSuccess("Data Berhasil Di Update !", "/Customer/PlanCustomer");
            } else {
                alertError(data.Message, "/Customer/PlanCustomer");
            }
        }
    })
}

function showdetails(Id) {
    $.ajax({
        url: baseUrl + '/Customer/GetCall?Param=GetDetailCall&&Id=' + Id,
        type: 'GET',
        success: function (data) {
            var obj = data.Return;
            if (data.Status == "1") {
                console.log("Data", data);
                var content = [];

                var Maps = "<iframe width = '100%' height = '270' frameborder = '0' scrolling = 'no' marginheight = '0' marginwidth = '0' src = 'https://maps.google.com/maps?q=" + obj[0].Latitude + "," + obj[0].Longitude + "&hl=es&z=14&amp;output=embed' ></iframe >";
                $(".CustomerName").html(obj[0].CustomerName == "" ? "-" : obj[0].CustomerName);
                $(".Maps").html(Maps);
                $(".CallType").html(obj[0].CallType == "" ? "-" : obj[0].CallType);
                $(".Outlet").html(obj[0].OutletName == "" ? "-" : obj[0].OutletName);
                $(".Month").html(obj[0].MonthOfYear == "" ? "-" : obj[0].MonthOfYear);
                $(".Time").html(obj[0].Date == "" ? "-" : obj[0].Date + "-" + obj[0].Time);
                $(".Product").html(obj[0].ProductName == "" ? "-" : obj[0].ProductName);
                $(".Remarks").html(obj[0].Remarks == "" ? "-" : obj[0].Remarks);
                $(".Activity").html(obj[0].Activity == "" ? "-" : obj[0].Activity);
                var ViewImage = obj[0].Images == "-" || obj[0].Images == "" || obj[0].Images == "0" ? baseUrlImage + "Calls/noimage.png" : baseUrlImage + "Calls/" + obj[0].Images;
                var Img = '<img src="' + ViewImage + '" style="width: 200px; " class="rounded float - start" />';
                $(".ImageCustomer").html(Img)
                //alert(obj[0].Images)







            } else {
                alertError(data.Message);
            }
        }
    });
}

function getRSM(HeadCode) {
    $('.RSM').empty();
    $.ajax({
        url: baseUrl + '/Customer/GetHierarcy?HeadCode=' + HeadCode,
        type: 'GET',
        success: function (data) {
            var Status = data.Status;

            if (Status == "1") {
                var obj = data.Return;
                console.log("data RSM", obj);
                $('.RSM')
                    .append($("<option></option>")
                        .attr("value", "")
                        .text("Pilih RSM"));
                $.each(obj, function (key, value) {
                    $('.RSM')
                        .append($("<option></option>")
                            .attr("value", obj[key].Code)
                            .attr("name", obj[key].Name)
                            .text(obj[key].Name));
                });


            } else {
                alertError(data.Message, "/Setting/Participant")
            }
        }
    })
}

function getASM(RsmCode) {
    $('.ASM').empty();
    $.ajax({
        url: baseUrl + '/Customer/GetHierarcy?RSMCode=' + RsmCode,
        type: 'GET',
        success: function (data) {
            var Status = data.Status;

            if (Status == "1") {
                var obj = data.Return;
                console.log("data ASM", obj);
                $('.ASM')
                    .append($("<option></option>")
                        .attr("value", "")
                        .text("Pilih ASM"));
                $.each(obj, function (key, value) {
                    $('.ASM')
                        .append($("<option></option>")
                            .attr("value", obj[key].Code)
                            .attr("name", obj[key].Name)
                            .text(obj[key].Name));
                });


            } else {
                alertError(data.Message, "/Setting/Participant")
            }
        }
    })
}

function getPAM(ASMCode) {
    $('.PAM').empty();
    $.ajax({
        url: baseUrl + '/Customer/GetHierarcy?ASMCode=' + ASMCode,
        type: 'GET',
        success: function (data) {
            var Status = data.Status;

            if (Status == "1") {
                var obj = data.Return;
                console.log("data PAM", obj);
                $('.PAM')
                    .append($("<option></option>")
                        .attr("value", "")
                        .text("Pilih PAM"));
                $.each(obj, function (key, value) {
                    $('.PAM')
                        .append($("<option></option>")
                            .attr("value", obj[key].Code)
                            .attr("name", obj[key].Name)
                            .text(obj[key].Name));
                });


            } else {
                alertError(data.Message, "/Setting/Participant")
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

        alertSuccess("Data Berhasil Di Update !", "/Customer/PlanCustomer");


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
        var data = $(".ListCoverage").DataTable().column(0).data();
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


    if (Role == "HEAD") {
        getRSM(Code);
    } else if (Role == "RSM") {
        getASM(Code)
    } else if (Role == "ASM") {
        getPAM(Code)
    }
    showdata(function (data) {
        var datatable = $('.ListCoverage').DataTable({
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            orderCellsTop: true,
            fixedHeader: true,
            data: data
            , "columnDefs": [
                //{
                //    "targets": [2],
                //    "visible": false,
                //    "searchable": false
                //},
                {
                    "targets": [7, 8],
                    "visible": false
                }
            ]
        });

        $(".RSM").change(function () {
            //getASM($(".RSM").val())
            var val = $('option:selected', this).attr('name');
            getASM($(".RSM").val())

            if ($(".RSM").val() != "") {


                datatable
                    .column(8)
                    .search(val)
                    .draw();
            } else {
                datatable.draw();

            }

        });


        $(".ASM").change(function () {
            //getASM($(".RSM").val())
            var val = $('option:selected', this).attr('name');
            getPAM($(".ASM").val())

            if ($(".ASM").val() != "") {


                datatable
                    .column(7)
                    .search(val)
                    .draw();
            } else {
                datatable.draw();

            }

        })

        $(".MONTH").change(function () {
            //getASM($(".RSM").val())


            if ($(".MONTH").val() != "") {


                datatable
                    .column(5)
                    .search($(".MONTH").val())
                    .draw();
            } else {
                datatable.draw();

            }

        })

        $(".PAM").change(function () {
            //getASM($(".RSM").val())
            var val = $('option:selected', this).attr('name');
            if ($(".PAM").val() != "") {


                datatable
                    .column(6)
                    .search(val)
                    .draw();
            } else {
                datatable.draw();

            }

        })




    });





})