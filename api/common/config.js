const expressOptions = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['html', 'json'],
    index: false,
    maxAge: '1d',
    redirect: false
}

const connections = {
    entry: {
        host: 'localhost',
        port: 3000
    }
}
// TODO: Connection Pool maybe ? 
// For deploying certain services remotely? Good fun

module.exports = { 
    expressOptions, 
    connections
}