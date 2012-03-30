//Mobile Media Development
//Full Sail University
//Laura McCool

var parseGiftForm = function(data){};

$(document).ready(function(){
		
	var rbform = $('#giftForm');	
	rbform.validate({
		invalidHandler: function(form, validator){},
		submitHandler: function(){
			var data = rbform.serializeArray();
			parseGiftForm(data);
		}
	});

$('window').bind("DOMContentLoaded", function(){
	function $(x){
		var theElement = $('#theElement'); 
		return theElement;
	}
	//create select field element and populate it with options.
	function makeCats (){
		var formTag = document.getElementsByTagName("form"), //formTag is an array of all form tags.
			selectLi = $('select'),
			makeSelect = $("select"); 
			$('#makeSelect').attr("id", "category");
		for (var i=0, j=giftCategory.length; i<j; i++){
			 var makeOption = $('option');
			 var optText = giftCategory[i];
			 $('#makeOption').attr("value", optText);
			 makeOption.innerHTML = optText;
			 $('makeSelect').append('makeOption');
		}
		//selectLi.appendChild(makeSelect);
	}
	
	//Find value of selected radio button
	function getSelectedRadio(){
		var radios = document.forms(0).location;
		for(var i=0; i<radios.length; i++){
			if (radios[i].checked){
				locationValue = radios[i].value;
			}
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('giftForm').hide();
				$('clear').css('display','inline');
				$('displayData').hide();
				$('addNew').css('display','inline');
				break;
			case "off":
				$('giftForm').show();
				$('clear').css('display', 'inline');
				$('displayData').css('display', 'inline');
				$('addNew').hide();
				$('items').hide();
				break;
			default:
				return false;
		}
	}
	
	function storeData(key){
	// If there is no key this means this is a brand new item and we need a new key
		if (!key){
			var id 				= Math.floor(Math.random()*100000001);
		}else{
			//set the id to the exisiting key we're editing so that it will save over the data.
			//the key is teh same key that's been passed along from the editSubmit event handler
			//to validate function and then passed here into the storeData function
			id = key;
		}
		//Gather up all our form field values and store in an object
		//Object properties contain array with the form label and input value.
		getSelectedRadio();
		var item 				={};
			item.category 	 	= ["Gift Category:", $('category').value];
			item.comments 	 	= ["Gift Description:", $('comments').value];
			item.amount 	 	= ["Quantity:", $('amount').value];
			item.location 	 	= ["Where To Buy:", locationValue];
			item.store 	 		= ["Store Name:", $('store').value];
			item.url	 	 	= ["Product Url:", $('url').value];
			item.date	 	 	= ["Date Added:", $('date').value];
		
		//Save Data in localStorage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Item Added!");
	}

	function getData(){
		toggleControls("on");
		//write data from local storage to browser.
		if(localStorage.length === 0){
			alert("There is no data in Local Storage so default data was added.");
			autoFillData();
		}
		var makeDiv = $('div');
		$('#makeDiv').attr("id", "items");
		var makeList = $('ul');
		$('makeDiv').append('makeList');
		$('document.body').append('makeDiv');
		$('items').show();
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = $('li');
			var linksLi = $('li');
			$('makeList').append('makeli');
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert string from local storage value back to an object by using JSON.parse
			var obj = JSON.parse(value);
			var makeSubList = $('ul');
			$('makeli').append('makeSubList');
			getImage(obj.category[1], makeSubList);
			for(var n in obj){
				var makeSubli = $('li');
				$('makeSubList').append('makeSubli');
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				$('makeSubli').append('linksLi');
			}
			makeItemLinks(localStorage.key(i), linksLi); //Edit and delete buttons for Local Storage
		}
	}
	//Get image for the right category
	function getImage(catName, makeSubList){
		var imageLi = $('li');
		$('makeSubList').append('imageLi');
		var newImg = $('img');
		var setSrc = $('#newImg').attr("src","images/"+ catName +".png");  
		$('imageLi').append('newImg');
	}
	//Make Item Links Function
	//Create edit and delete links for each stored item when displayed
	
	function makeItemLinks (key, linksLi){
	//add edit single item link
		var editLink = $('a');
		editLink.href = "#";
		editLink.key = key;
		var editText ="Edit List";
		editLink.bind("click", editItem);
		//editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		$('linksLi').append('editLink');
		
		//add line break
		var breakTag = $('br');
		$('linksLi').append('breakTag');
		
		//delete single item link
		var deleteLink = $('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Item"
		deleteLink.bind("click", deleteItem);
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		$('linksLi').append('deleteLink');
	}
	//Auto Populate Local Storage
	function autoFillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id,JSON.stringify(json[n]));
		}
	
	}
	

	
	function editItem (){
		//grab date from local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//show form
		toggleControls("off");
		
		//populate form fields with current local storage values
		$('category').value = item.category[1];
		$('comments').value = item.comments[1];
		$('amount').value = item.amount[1];
		var radios = document.forms[0].location;
		for(var i=0; i<radios.length; i++){
			if(radios.value == "online" && item.location[1] == "online"){
					radios[i].setAttribute("checked", "checked");
				} else if (radios[i].value == "store" && item.location[1] == "store"){
					radios[i].setAttribute("checked", "checked");
				}
		}
		//$('location').value = item.location[1];
		$('store').value = item.store[1];
		$('url').value = item.url[1];
		$('date').value = item.date[1];
		
		//remove the initial listener from input 'save contact' button
		save.removeEventListener ("click", storeData);
		//Change submit button value to say edit button
		$('submit').value = "Edit List";
		var editSubmit = $('submit');
		//save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the date we edited 
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;		
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this item?")
		if (ask){
			localStorage.removeItem(this.key);
			alert("Item was deleted.");
			window.location.reload();
		}else{
			alert("Item was NOT deleted.")
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{ 
			localStorage.clear();
			alert("All items are deleted.");
			window.location.reload();
			return false;	
		}
	}
	
	function validate(e){
		//define elements we want to check
		var getCategory = $('category');
		var getComments = $('comments');
		var getAmount = $('amount');
		
		//Reset Error Message
		errMsg.innerHTML ="";
		$('#getCategory').css({border: '1px solid black'});
		$('#getComments').css({border: '1px solid black'});
		$('#getAmount').css({border: '1px solid black'});
		
		//Get Error Messages
		var messageAry = [];
		//Category Validation
		if (getCategory.value === "--Choose A Gift Category--"){
			var categoryError = "Please choose a category.";
			$('#getCategory').css({border: '1px solid red'});
			messageAry.push(categoryError);
		}
		
		//Comments validation
		if (getComments.value === ""){
			var commentsError = "Please include your item.";
			$('#getComments').css({border: '1px solid red'});
			messageAry.push(commentsError);
		}
		
		//If there were errors display them on the screen
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = $('li');
				txt.innerHTML = messageAry[i];
				$('errMsg').append('txt');
			}	
			e.preventDefault();
			return false;	
		}else {
			//If all is well save our data. send the key value (which came from editData function
			//remember this key value was passed thru the editSubmit event listener as a property
			storeData(this.key);
		}

	};
	
	//var defaults
	var giftCategory = ["--Choose A Gift Category--", "Electronics", "Entertainment", "Apparel", "Music", "Books", "Etc"],
		locationValue,
		errMsg = $('errors');
	makeCats();
	//set link and click events
	var displayData = $('displayData');
	displayData.addEventListener("click", getData);
	var clearData =$('clear');
	clearData.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", validate);

});
