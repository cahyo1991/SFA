
function GenerateBarChart(MonthName,Value) {
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';


    var ctx = document.getElementById("myBarChart");
    var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: MonthName,
            datasets: [{
                label: "Revenue",
                backgroundColor: "rgba(2,117,216,1)",
                borderColor: "rgba(2,117,216,1)",
                data: Value,
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'month'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 6
                    }
                }],
                yAxes: [{
                    ticks: {
                        //min: 0,
                        //max: 100,
                        maxTicksLimit: 5
                    },
                    gridLines: {
                        display: true
                    }
                }],
            },
            legend: {
                display: false
            }
        }
    });
}

function getData(Param) {
    $.ajax({
        url: baseUrl + '/Customer/GetDashboard?Param=' + Param,
        type: 'GET',
        success: function (data) {
            var obj = data.Return;
            if (data.Status == "1") {
                console.log("Data", data);

                if (Param == "CallTotal") {
                    var MonthName = [];
                    var Value = [];
                    for (var i = 0; i < obj.length; i++) {
                        MonthName.push([obj[i].MonthName]);
                        Value.push([obj[i].Value]);
                    }
                    GenerateBarChart(MonthName, Value)
                } else {
                    var CallTarget = [];
                    //CallTarget.push([obj[0].SetTotalCall, [obj[0].SetTotalTarget]);
                    CallTarget.push([obj[0].SetTotalCall]);
                    CallTarget.push([obj[0].SetTotalTarget]);
                    console.log("Call Target", CallTarget);
                    chartpie(CallTarget);
                    $(".percentage").html([obj[0].Percentage] + "%");
                    $(".MonthName").html([obj[0].MonthName])
                    
                }

  

            } else {
                alertError(data.Message);
            }
        }
    });
}


function chartpie(CallTarget) {
    // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

    // Pie Chart Example
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Call", "Target"],
            datasets: [{
                data: CallTarget,
                backgroundColor: ['#007bff', '#dc3545'],
            }],
        },
    });
}



$(document).ready(function () {

    getData("CallTotal");
    getData("CallPerfomance");


});