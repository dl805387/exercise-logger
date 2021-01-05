// This function forces the user to fill out the input fields before clicking on submit button.
function validateForm() {
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
}