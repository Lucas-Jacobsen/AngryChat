import sql from "mysql";
import os from "os"


let port = 3306;
if(os.platform() == "darwin") {
    port = 8889;
}


    export let connection = sql.createConnection({
        host     : "127.0.0.1",
        port     : port,
        user     : "root",
        password : "root",
        database : "cst_326"
    })

