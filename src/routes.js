
const { addBookHandler, getAllBooksHandler } = require('./handler');

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
        method: '*',
        path: '/{any*}',
        handler: () => 'Halaman tidak ditemukan',
    },
];

module.exports = routes;