
const { addBookHandler, getAllBooksHandler, getBooksByIdHandler, editBooksByIdHandler } = require('./handler');

const routes = [
    {
        method: 'POST', 
        path: '/books',
        handler: addBookHandler,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    },
    {
        method: 'GET', 
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'GET', 
        path: '/books/{bookId}',
        handler: getBooksByIdHandler,
    },
    {
        method: 'PUT', 
        path: '/books/{bookId}',
        handler: editBooksByIdHandler,
    },
    {
        method: '*',
        path: '/{any*}',
        handler: () => 'Halaman tidak ditemukan',
    },
];

module.exports = routes;