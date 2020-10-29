const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./mocks/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.rewriter({
    '/api/courses': '/courses',
    '/api/courses/:id': '/details/:id'
}));

server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running')
})
