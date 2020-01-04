$(document).ready(function () {  //waits for page load
    const tableSize = 5;

    let generateResList = function (data) {
        for (let i = 0; i < tableSize; i++) {
            let newItem = $("<li>");
            newItem.addClass("list-group-item mt-4");
            let tableNum = $("<h2>").text("Table " + (i + 1));
            newItem.append(tableNum);
            let name = $("<h2>").text("Name: " +data[i].name);
            let email = $("<h2>").text("Email: " +data[i].email);
            let phone = $("<h2>").text("Phone: " +data[i].phone);
            let id = $("<h2>").text("Reservation ID: "+data[i].uniqueId);
            newItem.append(name).append(phone).append(email).append(id);

            $("#tableList").append(newItem);

        }
    }

    let generateWaitList = function (data) {
        for (let i = tableSize; i < data.length; i++) {
            let newItem = $("<li>");
            newItem.addClass("list-group-item mt-4");
            let tableNum = $("<h2>").text("Wait number " + (i + 1));
            newItem.append(tableNum);
            let name = $("<h2>").text("Name: " +data[i].name);
            let email = $("<h2>").text("Email: " +data[i].email);
            let phone = $("<h2>").text("Phone: " +data[i].phone);
            let id = $("<h2>").text("Reservation ID: "+data[i].uniqueId);
            newItem.append(name).append(phone).append(email).append(id);

            $("#waitList").append(newItem);

        }
    }

    let getData = function () {
        $.get("/api/reservations").then(function(data) {
            console.log(data);

            if (data) {
                generateResList(data);
    
                if (data.length > tableSize) {  //only render waitlist if needed
                    generateWaitList(data);
                  }
    
            } else {
                newItem = $("<li>").text("No reservations in the system")
                $("#tableList").append(newItem);
            }
    
    }
        )};


getData();






});