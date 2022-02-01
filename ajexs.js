$(document).ready(function () {
  $("#ent").click(function (e) {
    e.preventDefault();
    console.log("button clicked");

    let req = $.ajax({
      url: "https://reqres.in/api/users?page=2",
      method: "GET",
      dataType: "json",
      statusCode: {
        200: function () {
          alert("code is success");
        },
      },
      success: function (data) {
        console.log(data);
        msg = `<div>${data}</div>`;
        $("#op").html(msg);
      },
    });
    req.done(function (msg, textStatus, resinfo) {
      console.log("done " + textStatus + resinfo.status);
      $("#op").text(resinfo.status);
    });
    req.fail(function (jqxHR, textStatus) {
      alert("req fail " + textStatus);
    });
    req.always(function (jqXHR, textStatus) {
      console.log("always " + textStatus);
    });
  });
});
