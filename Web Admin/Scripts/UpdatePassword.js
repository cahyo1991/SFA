
function UpdatePassword(NewPassword) {
    $.ajax({
        url: baseUrl + "/Customer/DoUpdatePassword?NewPassword=" + NewPassword,
        type: "GET",
        success: function (data) {

            if (data.Status == "1") {
                alertSuccess("Password Berhasil Di Update, Silahkan Login Kembali !",
                    baseUrl +"/Login/Logout"
                )
            } else {
                alertError(data.Message)
            }


        }
    })
}





$(document).ready(function () {
    $("#DoUpdatePassword").on("submit", function (event) {
        event.preventDefault();

        if ($("#NewPassword").val() === $("#NewPassword2").val()) {
            //alertSuccess("Sama")
            UpdatePassword($("#NewPassword").val())
        } else {
            alertError("Password Tidak Sama !")
        }

    })
});