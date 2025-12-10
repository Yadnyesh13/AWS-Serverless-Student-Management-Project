// Add your API endpoint here
var API_ENDPOINT = "https://fnso1l0r22.execute-api.ap-south-1.amazonaws.com/production";


// Save student data
document.getElementById("savestudent")?.addEventListener("click", function () {
    var inputData = {
        studentid: document.getElementById("studentid").value,
        name: document.getElementById("name").value,
        class: document.getElementById("class").value,
        age: document.getElementById("age").value,
    };

    fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to save student data.");
            }
            return response.json();
        })
        .then(() => {
            document.getElementById("studentSaved").textContent = "Student Data Saved!";
            document.getElementById("studentSaved").style.color = "green";
        })
        .catch(() => {
            document.getElementById("studentSaved").textContent = "Error saving student data.";
            document.getElementById("studentSaved").style.color = "red";
        });
});

// Retrieve all students
document.getElementById("getstudents")?.addEventListener("click", function () {
    fetch(API_ENDPOINT)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch student data.");
            }
            return response.json();
        })
        .then((data) => {
            var tableBody = document.getElementById("studentTable");
            tableBody.innerHTML = ""; // Clear previous data

            // Loop through each student and insert into the table
            data.forEach((student) => {
                var row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${student.studentid}</td>
                    <td>${student.name}</td>
                    <td>${student.class}</td>
                    <td>${student.age}</td>
                `;
            });
        })
        .catch((error) => {
            console.error(error);
            alert("Error retrieving student data.");
        });
});
