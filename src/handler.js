const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const id = nanoid(16);
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const finished = (readPage == pageCount) ? true : false; 
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  
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
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
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

const getAllBooksHandler = (request, h)  => {
    const { name, finished, reading } = request.query; 

    if ( name !== undefined ){
        const buku = books.filter((temp) => temp.name.toLowerCase().includes(name.toLowerCase())); 
        const response = h.response ({
            status : 'success', 
            data : {
                books: buku.map((buku) => ({
                    id : buku.id,
                    name : buku.name, 
                    publisher : buku.publisher, 
                })), 
            },
        });
        response.code(200); 
        return response; 
    }

    if ( finished !== undefined) {
        const buku = books.filter((temp) => temp.finished == finished); 
        const response = h.response({
            status : 'success', 
            data : {
                books: buku.map((buku) => ({
                    id : buku.id, 
                    name : buku.name, 
                    publisher : buku.publisher, 
                })),
            },
        });
        response.code(200); 
        return response; 
    }

    if ( reading !== undefined) {
        const buku = books.filter((temp) => temp.reading == reading); 
        const response = h.response({
            status : 'success', 
            data : {
                books: buku.map((buku) => ({
                    id : buku.id, 
                    name : buku.name, 
                    publisher : buku.publisher, 
                })),
            },
        });
        response.code(200); 
        return response; 
    }

    const response = h.response ({
        status : 'success', 
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
    const { bookId } = request.params;
  
    const book = books.filter((temp) => temp.id === bookId)[0];
  
    if (book !== undefined) {
        const response  = h.response({
            status: 'success', 
            message: 'Buku ditemukan',
            data: {
                book, 
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
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString(); 
    const idx = books.findIndex((buku) => buku.id === bookId);
  
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

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
    response.code(404);
    return response;
  };

  const deleteBooksByIdHandler = (request, h) => {
    const { bookId } = request.params;
  
    const idx = books.findIndex((buku) => buku.id === bookId);
  
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
