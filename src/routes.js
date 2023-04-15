
const routes = [
    {
        method: 'POST', 
        path: '/books',
        handler: addBooHandler,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    },
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => 'Halaman tidak ditemukan',
    },
];

module.exports = routes;