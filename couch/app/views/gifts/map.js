function(doc) {
  if (doc._id.substr(0, 5) === "gift:") {
	  emit(doc._id.substr(5),{
		"category":doc.category,
		"amount": doc.amount,
		"comments": doc.comments,
		"date": doc.date,
		"location": doc.location,
		"store": doc.store,
		"url": doc.url
  	  });
   }
};