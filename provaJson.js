var fileInput = document.getElementById("uploadJSON");
var users_list = [];

/**
 * Function to interpret the JSON file and store it in a variable
 */
fileInput.addEventListener('change', function (e) {

    var file = fileInput.files[0];
    var reader = new FileReader();
    var plainTextJSON;

    reader.onload = function (e) {
        plainTextJSON = reader.result;

        var c = JSON.parse(plainTextJSON);

        insertUsers(c);
    }

    reader.readAsText(file);
});

/**
 * Function to insert users in the "users_list" list from the JSON file uploaded
 * @param {} obj 
 */
function insertUsers(obj) {
    var user = {
        name: "",
        address: ""
    }

    for (var i in obj) {
        var a = iterationCopy(user);
        a.address = obj[i].address;
        a.name = obj[i].name;
        $("#content").append("<div class='row justify-content-center mb-1'><div class='userBox btn-info col-sm-4'><p class='m-0'>" + a.address + "</p><p class='m-0'>" + a.name + "</p></div></div>");
        users_list.push(a);
    }
}

/**
 * Function to get a deep copy of the user object
 * @param {} src 
 */
function iterationCopy(src) {
    var target = {
        name : src.name,
        address : src.address
    }
    return target;
}

/**
 * Function to create new users from the input forms in the website
 */
function submitForm() {
    //If both inputs are not filled with something, prints an alert
    if ($("#address").val() === "" || $("#name").val() === "") alert("Fill both the input boxes");
    else {
        //Created an User which is pushed in the users list
        var user = {
            name: $("#name").val(),
            address: $("#address").val()
        }

        users_list.push(user);

        $("#content").append("<div class='row justify-content-center mb-1'><div class='userBox btn-info col-sm-4'><p class='m-0'>" + user.address + "</p><p class='m-0'>" + user.name + "</p></div></div>");

        $("#name").val("");
        $("#address").val("");
    }
}


/**
 * Function to export JSON file of all the users contained in the "users_list" list
 */
function downloadJSON() {

    var filename = "json-export.json";
    var element = document.createElement("a");

    element.setAttribute("href", "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(users_list)));
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

