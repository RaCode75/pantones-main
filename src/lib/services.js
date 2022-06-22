const Service = require('node-windows').Service

const svc = new Service({
    name: "nodePantoneServer",
    description: "Base de datos de colores pantones",
    script: "C:\\Users\\RABREU\\Desktop\\Personal\\code\\nodeCode\\pantones-main\\src\\index.js"
})

svc.on('install', function(){
    svc.start()
})

svc.install()