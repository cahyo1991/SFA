

function showCalendar(data) {
    var $calendar;
    console.log(new Date(new Date().setHours(new Date().getHours() + 24)).toDateString());
    let container = $("#container").simpleCalendar({
        fixedStartDay: 0, // begin weeks by sunday
        disableEmptyDetails: true,
        events: data,

    });
    $calendar = container.data('plugin_simpleCalendar')
}


function showdata() {
    $.ajax({
        url: baseUrl + '/Customer/GetBirthday',
        type: 'GET',
        success: function (data) {
            var obj = data.Return;
            if (data.Status == "1") {
                console.log("Data", data);
                var content = [];
                for (var i = 0; i < obj.length; i++) {
                    content.push({ startDate: obj[i].Date, endDate: obj[i].Date, summary: obj[i].CustomerName });
                }

                showCalendar(content)
                
            } else {
                alertError(data.Message);
            }
        }
    });
}

$(document).ready(function () {
    //showCalendar();
    showdata();
});