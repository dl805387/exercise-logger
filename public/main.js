// This function forces the user to fill out the input fields before clicking on submit button.
function validateForm(str) {

    var nameField = document.forms["myForm"]["name"].value;
    if (nameField == "" || nameField == null) {
      alert("Exercise name must be filled out");
      return false;
    }

    var setsField = document.forms["myForm"]["sets"].value;
    if (setsField == "" || setsField == null) {
      alert("# of Sets must be filled out");
      return false;
    }

    // Checks to see if there is a duplicate exercise name.
    // This is done by turning the string into an array and then comparing the elements of the array to the input field name.
    var strArray = str.split(" ");
    var input = document.getElementById("nameField").value;
    for (var i = 0; i < strArray.length; i++) {
        if (strArray[i] == input) {
            alert("This exercise has already been added");
            document.getElementById("nameField").value = "";
            document.getElementById("setsField").value = "";
            return false;
        }
    }

}
