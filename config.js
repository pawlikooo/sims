var config = {
    port: process.env.NODE_PORT || 3000,
    database: {
        protocol: "mysql",
        query: { pool: true },
        host: "127.0.0.1",
        database: "msg",
        user: "root",
        password: "iddqd"
    },
    generator: {
        usersCount: 100,
        messagesCount: 1000
    }
};

module.exports = config;