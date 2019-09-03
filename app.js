// book constuctor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
};

//ui constructor
function UI(){};

UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');

  //create tr element

  const row = document.createElement('tr');

  //insert calls

  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href='#' class="delete">X<a></td>
  `

  list.appendChild(row);
}

UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}
//show alert
UI.prototype.showAlert = function(message, className){

  const div = document.createElement('div');
  //add class name
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector('.container');
  //get form
  const form = document.querySelector('#book-form');
  //insert alert
  container.insertBefore(div, form);
  //timeout after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
};

//delete book
UI.prototype.deleteBook = function (target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();

  };
};

//event listen

document.getElementById('book-form').addEventListener('submit', 
  function (e){
    //get form values
    const title = document.getElementById('title').value;
          author = document.getElementById('author').value;
          isbn = document.getElementById('isbn').value;

    // instantiate book
    const book = new Book(title, author, isbn);

    //int ui

    const ui = new UI();

    //validate

    if(title ==='' || author === '' || isbn === ''){
      //show alert
      ui.showAlert('Please fill in all field', 'error')
    }else{
      //add book to list
      ui.addBookToList(book);

      //show sucess
      ui.showAlert('book added!', 'success');

      //clear fields

      ui.clearFields();

    }

    e.preventDefault();
  });

  // event listener for delete

  document.getElementById('book-list').addEventListener('click' ,function(e){
    const ui = new UI();
    if(e.target.className === 'delete'){
      ui.deleteBook(e.target); 
      ui.showAlert('Book removed', 'success');
    }

    e.preventDefault();
  });