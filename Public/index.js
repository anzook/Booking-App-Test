$( document ).ready(function() {  //waits for page load


$("#add-btn").on("click", function(event) {
  event.preventDefault();
  var newRes = {
    name: $("#name").val().trim(),
    phone: $("#phone").val().trim(),
    email: $("#email").val().trim(),
  };

  $.post("/api/reservations", newRes)
    .then(function(data) {
      console.log("reservation.html", data);
      alert("Adding reservation...");
    });
});



});