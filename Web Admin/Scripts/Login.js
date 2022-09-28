
function Login(Nik,Password,Role) {
    $.ajax({
        url: baseUrl + "Login/DoLogin",
        type: "POST",
        data: {
            Nik: Nik,
            Password: Password,
            Role: Role
        },
        success: function (data) {

            if (data.Status == "1") {
                window.location.href = baseUrl + "Customer/Dashboard/";
            } else {
                alert(data.Message)
            }

            
        }
    })
}


$(document).ready(function () {
    $("#loginform").on("submit", function (event) {
        event.preventDefault();

        Login($("#Nik").val(), $("#Password").val(), $("#Role").val())

    })
});