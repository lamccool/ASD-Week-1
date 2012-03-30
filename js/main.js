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

// Edit data

function editItem(id) {
    var itemId = id;
	var value = localStorage.getItem(itemId);
	value = value.split(',');
	toggleControls("off");
    var comments = value[0];
    var quantity = value[1];
    var gift-cat = value[2];
    var location = value[3];
    var storename = value[4];
	var url = value[5];
	var date = value[6];


	$("#comments").val(comments);
	$("#quantity"). val(quantity);
	$("#gift-cat").val(gift-cat);
	$("#location"). val(location);
	$("#storename").val(storename);
	$("#url").val(url);
	$("#date").val(date);
	
	var editButton = $('#edit-item-button').css('display', 'block');
    var subresButtons = $('#submit-reset-buttons').css('display', 'none');
    var itemList = $('#list').css('display', 'none');
