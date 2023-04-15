const { nanoid } = require('nanoid');
const books = require('./books');

const addNoteHandler = (request, h) => {
  const id = nanoid(16);
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const finished = (readPage == pageCount) ? true : false; 
  const insertAt = new Date().toISOString();
  const updatedAt = insertAt;
  
  if ( name === undefined ){
    const response = h.response({
        status : 'fail', 
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response; 
  }
  if ( pageCount < readPage ){
    const response = h.response({
        status : 'fail', 
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response; 
  }

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertAt, updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};
