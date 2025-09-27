const http = require('http')

const userData = [
    {
        'Name':'Haroon',
        'Age':20,
        'Email':'haroon@gmail.com'
    },
    {
        'Name':'Hadi',
        'Age':5,
        'Email':'hadi@gmail.com'
    },
    {
        'Name':'Hanan',
        'Age':2,
        'Email':'hanan@gmail.com'
    },
]
const server =http.createServer((req,resp)=>{
    resp.setHeader('Content-Type','application/json')
    resp.write(JSON.stringify(userData))
    resp.end()

})
server.listen(1197)