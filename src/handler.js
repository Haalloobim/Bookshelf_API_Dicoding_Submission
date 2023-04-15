const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
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

const getAllBooksHandler = ()  => {
    const response = h.response ({
        status : 'succes', 
        message : 'Semua buku berhasil ditampilkan', 
        data: {
            books: books.map((buku) => ({
                id : buku.id, 
                name : buku.name, 
                publisher : buku.publisher,  
            })),
        },
    });
    response.code(200); 
    return response; 
};

const getBooksByIdHandler = (request, h) => {
    const { id } = request.params;
  
    const buku = books.filter((temp) => temp.id === id)[0];
  
    if (buku !== undefined) {
        const response  = h.response({
            status: 'success', 
            message: 'Buku ditemukan',
            data: {
                buku, 
            },
        });
        response.code(200);
        return response;
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  };

  const editBooksByIdHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString(); 
    const idx = books.findIndex((buku) => buku.id === id);
  
    if ( name === undefined ) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    if ( pageCount < readPage ){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    if ( id === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        });
        response.code(404);
        return response;
    }

    if (idx !== -1) {
      books[idx] = {
        ...books[idx],
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading
      };
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
  };

  const deleteBooksByIdHandler = (request, h) => {
    const { id } = request.params;
  
    const idx = books.findIndex((buku) => buku.id === id);
  
    if (idx !== -1) {
      books.splice(idx, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };


module.exports = { addBookHandler, getAllBooksHandler, getBooksByIdHandler, editBooksByIdHandler, deleteBooksByIdHandler };
