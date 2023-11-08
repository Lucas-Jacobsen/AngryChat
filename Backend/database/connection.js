import sql from "mysql";

    export let connection = sql.createConnection({
        host     : "127.0.0.1",
        port     : 8889,
        user     : "root",
        password : "root",
        database : "cst326"
    })

