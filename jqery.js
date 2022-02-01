$(document).ready(function () {
  $("#enters").click(function (e) {
    e.preventDefault();
    console.log("button clicked");

    let name = $("#exampleInputEmail1").val();
    let pass = $("#exampleInputPassword1").val();
    console.log(name);
    console.log(pass);

    dataList = { name: name, pass: pass };
    console.log(dataList);
  });

  $.ajax({
    url: "insert.php",
    method: "POST",
    data: JSON.stringify(dataList), //sending data to server
    success: function (data) {
      //after success return data is sent
      console.log(data); //loging response
      message = "<div>+ data +</div>"; // storing
      $("#message").html(message); // showing on target Id.
      $("#myform")[0].reset(); //reset form.

      dataGetMethod(); //to refresh data
    },
  });

  function dataGetMethod() {
    //storing get method invariable
    output = ""; //var declaring to show data
    $.ajax({
      url: "retrive.php", //address
      method: "GET", //method
      dataType: "json", //data type to get from server
      success: function (data) {
        //onsuccess
        console.log(data);
        if (data) {
          x = data;
        } //storing data in var
        else {
          x = "";
        }

        for (let i = 0; i < x.length; i++) {
          output += "name" + x[i].name + "pass" + x[i].pass;
        }
        $("#showResult").html(output); //putting data to target id.
      },
    });
  }

  dataGetMethod(); //calling get method to fetch data.

  //to Delete the the data

  $("divbody").on("click", ".btn-del", function () {
    console.log("button is to delete");
    let id = $(this).attr("item-id"); //getting Id of clicked attr.

    mydata = { id: id }; //storing data to var.
    $.ajax({
      url: "delete.php",
      method: "POST",
      data: JSON.stringify(mydata),
      success: function (data) {
        console.log("deleted" + data);
        message = "<div>+ data +</div>"; // storing
        $("#message").html(message); // showing on target Id.
        dataGetMethod(); //to refresh data
      },
    });
  });

  //update
  $("body").on("click", "btn-edit", function () {
    //trigger Edit function on click of #btn-edit Id
    console.log("your edited ");
    let id = $(this).attr("data-sid"); //fetching id to edit
    console.log(id);
    mydata = { id: id }; //assigning to var
    $.ajax({
      url: "edit.php",
      method: "POST",
      dataType: "json",
      data: JSON.stringify(mydata),
      success: function (data) {
        console.log(data);
        console.log("edited");
        // resetting values
        $("#name").val(data.name);
        $("#email").val(data.email);
        $("#pass").val(data.pass);
      },
    });
  });
});
