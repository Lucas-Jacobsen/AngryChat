import sql from "mysql";
import os from "os"

let port = 3306;
if(os.platform() == "darwin") {
    port = 8889;
}

export let connection = sql.createConnection({        
    host     : process.env.host,
    port     : port,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database,
    insecureAuth: true
})
