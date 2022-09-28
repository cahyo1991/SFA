
function showdata(callback) {
    AlertLoading();
    $.ajax({
        url: baseUrl + '/Customer/GetEtcp?Param=GetETCP',
        type: 'GET',
        success: function (data) {
            var obj = data.Return;
            if (data.Status == "1") {
                console.log("Data",data);
                var content = [];

                for (var i = 0; i < obj.length; i++) {
                    var Name = obj[i].CustomerName ;
                    var Specialty = obj[i]._IdSpecialty;
                    var Segmentation = obj[i]._IdSegmentation ;
                    var PAM = obj[i].PAMName;
                    var ASM = obj[i].ASMName;
                    var RSM = obj[i].RSMName;
                    var Button = "<button class='btn btn-primary UpdateParticipant' onclick='showdetail(" + obj[i].IdTerritoryCoverage + ")'  data-bs-toggle='modal' data-bs-target='.myModal'> View  </button>";
                    content.push([obj[i].IdTerritoryCoverage, Name, Specialty, Segmentation, PAM, ASM, RSM, Button]);
                }
                callback(content)
                CloseLoading();
            } else {
                alertError(data.Message);
                console.log("Data", data);
            }
        }
    });
}

function showdetail(Id) {
    $.ajax({
        url: baseUrl + '/Customer/GetEtcp?Param=GetDetailETCP&&Id=' + Id,
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
function exportExcel() {
    $(".ListCoverage").DataTable().button('.buttons-excel').trigger();

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
            data: data,
            //, "columnDefs": [
            //    //{
            //    //    "targets": [2],
            //    //    "visible": false,
            //    //    "searchable": false
            //    //},
            //    {
            //        "targets": [7, 8, 9, 10],
            //        "visible": false
            //    }
            //]
        });

        $(".RSM").change(function () {
            //getASM($(".RSM").val())
            var val = $('option:selected', this).attr('name');
            getASM($(".RSM").val())

            if ($(".RSM").val() != "") {


                datatable
                    .column(6)
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
                    .column(5)
                    .search(val)
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
                    .column(4)
                    .search(val)
                    .draw();
            } else {
                datatable.draw();

            }

        })




    });

    



})