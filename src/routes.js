
const routes = [
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => 'Halaman tidak ditemukan',
    },
];

module.exports = routes;