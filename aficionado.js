function validateForm() {
    var teaName = document.forms["teaLog"]["tea-name"].value;
    if (teaName == "") {
        alert("Name must be filled out");
        return false;
    }
}