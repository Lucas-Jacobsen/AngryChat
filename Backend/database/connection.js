import sql from "mysql";
import os from "os"
import dotenv from 'dotenv'
dotenv.config();

    let port = process.env.WINPORT;
    if(os.platform() == "darwin") {
        port = process.env.MACPORT;
    }

    export let connection = sql.createConnection({
        host     : process.env.HOST,
        port     : port,
        user     : process.env.USERNAME,
        password : process.env.PASSWORD,
        database : process.env.DATABASE
    })

