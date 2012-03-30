//Save Data

$('#submit').live('click', function saveData(id) {
var comments = $("#comments").val();
var quantity = $("#quantity"). val();
var gift-cat = $("#gift-cat").val();
var location = $("#location"). val();
var storename = $("#storename").val();
var url = $("#url").val();
var date = $("#date").val();

var item = [
    comments, quantity, gift-cat, location, storename, url, date];
    localStorage.setItem(key, item);
    location.reload();
    alert("Item Saved!");
});

 function toggleControls(n) {
    switch (n) {
    case "on":
        $('#giftForm').css('display', 'none');
        $('#clear').css('display', 'inline');
        break;
    case "off":
        $('#giftForm').css('display', 'block');
        $('#clear').css('display', 'inline');
        $('#list').css('display', 'none');
        break;
    default:
        return false;
    }
};

//Clear Data

function clearLocal() {
    if (localStorage.length === 0) {
        alert("There is no data to clear.");
    } else {
        localStorage.clear();
        alert("All data has been cleared.");
        window.location.reload();
        return false;
    }
}

$("#giftForm").validate({
    submitHandler: function(form) {
        console.log("Call Action");
    }
});