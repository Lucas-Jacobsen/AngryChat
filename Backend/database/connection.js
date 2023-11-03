import sql from "mysql";
import os from "os"
import dotenv from 'dotenv'
dotenv.config();

    let port = process.env.WINPORT;
    if(os.platform() == "darwin") {
        port = process.env.MACPORT;
    }

    export let connection = sql.createConnection({
        host     : "127.0.0.1",
        port     : 3307,
        user     : "root",
        password : "root",
        database : "cst_326"
    })

