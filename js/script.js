var book={};
$(document).ready(function(){
$('#modal-add-ok').on('click',addToLibrary);
});
function addToLibrary(){
	var formData = $('form').serializeArray();
	var newArray={};
	for(key in formData){
		newArray[formData[key]['name']]=formData[key]['value'];
	}
	var data=$(this).attr('data');
	if(data==undefined){
	var randomArticul=Math.round(Math.random()*1000000);
	book[randomArticul]=newArray;
	drawBook(randomArticul);
}
else{
	book[data]=newArray;
	drawBook(data);
}
	$('#modal-add').modal('hide');
};
function drawBook(articul){
	var bookFind = $('.book[data='+articul+']');
	if(bookFind.length==0){
	var div = document.createElement('div');
	div.className="col-lg-4 book";
	div.setAttribute('data',articul);

    var cover = document.createElement('div');
	cover.className="book-cover";
	cover.style.backgroundImage=`url(${book[articul]['book-cover']})`;

	var bookName = document.createElement('h4');
	bookName.className="book-title";
	bookName.innerHTML=book[articul]['book-name'];

	var bookYear = document.createElement('h4');
	bookYear.className="book-year";
	bookYear.innerHTML=book[articul]['book-year'];

    var bookAuth = document.createElement('h6');
	bookAuth.className="book-auth";
	bookAuth.innerHTML=book[articul]['book-auth'];

	var bookFile = document.createElement('a');
	bookFile.className="book-file";
	bookFile.setAttribute("href","book[articul]['book-file']");
    bookFile.innerHTML=book[articul]['book-file'];

	var buttonEdit = document.createElement('button');
	buttonEdit.className="btn btn-success edit";
	buttonEdit.innerHTML='Edit book';
	buttonEdit.setAttribute('data',articul);
	buttonEdit.onclick=editBook;

	var buttonDelete = document.createElement('button');
	buttonDelete.className="btn btn-danger delete";
	buttonDelete.innerHTML='Delete book';
	buttonDelete.setAttribute('data',articul);
	buttonDelete.onclick=deleteBook;

	div.appendChild(cover);
	div.appendChild(bookName);
	div.appendChild(bookAuth);
    div.appendChild(bookYear);
	div.appendChild(bookFile);	
    div.appendChild(buttonEdit);
    div.appendChild(buttonDelete);


	$('.book-panel').append(div);

	}
	else{
		var bookCover=bookFind.find('.book-cover');
		bookCover.css({'background-image':'url('+book[articul]['book-cover']+')'});
		var bookName=bookFind.find('.book-title');
		bookName.html(book[articul]['book-name']);
		var bookYear=bookFind.find('.book-year').eq(0);
		bookYear.html(book[articul]['book-year']);
		var bookAuth=bookFind.find('.book-auth').eq(0);
		bookAuth.html(book[articul]['book-auth']);
	    var bookFile=bookFind.find('.book-file').eq(0);
		bookFile.html(book[articul]['book-file']);
		$('#modal-add-ok').removeAttr('data');
	}
};
function editBook(){
	var data = $(this).attr('data');
	//console.log(data);
	$('#modal-add').modal('show');
	$('form .book-name').val(book[data]['book-name']);
	$('form .book-auth').val(book[data]['book-auth']);
	$('form .book-year').val(book[data]['book-year']);
	$('form .book-cover').val(book[data]['book-cover']);
	$('form .book-file').val(book[data]['book-file']);
	$('#modal-add-ok').attr('data',data);
}
function deleteBook(){
	$(this).parent('.book').remove();
	var data = $(this).attr('data');
	delete book[data];
}