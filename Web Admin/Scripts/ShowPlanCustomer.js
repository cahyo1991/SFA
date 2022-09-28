
function showdata(callback) {
    AlertLoading();
    $.ajax({
        //url: baseUrl + '/Customer/GetEtcp?Param=GetETCP',
        url: baseUrl + '/Customer/GetPlan?Param=GetPlan',
        type: 'GET',
        success: function (data) {
            var obj = data.Return;
            if (data.Status == "1") {
                console.log("Data", data);
                var content = [];

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
                    //var Button = "<a class='btn btn-primary' href='" + baseUrl+"/Customer/DetailCallCustomer'>View </a>";
                    content.push([obj[i].IdPlan,obj[i].CustomerName, obj[i].OutletName, obj[i].Date + "-" + obj[i].Time, obj[i].WeekOfMonth, obj[i].MonthOfYear
                        , obj[i].PAMName, obj[i].ASMName, obj[i].RSMName, obj[i].StatusPlanCall, obj[i].ReasonNotCall == "" ? "-" : obj[i].ReasonNotCall]);
                }
                CloseLoading();
                callback(content)
            } else {
                alertError(data.Message);
            }
        }
    });
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

$(document).ready(function () {

    if (Role == "HEAD") {
        getRSM(Code);
    } else if (Role == "RSM") {
        getASM(Code)
    } else if (Role == "ASM") {
        getPAM(Code)
    }
    showdata(function (data) {
        var datatable = $('.ListCoverage').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'excel'
            ],
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
                    "targets": [7,8],
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