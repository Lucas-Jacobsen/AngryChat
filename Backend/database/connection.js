import sql from "mysql";
import os from "os"

let port = 3306;
if(os.platform() == "darwin") {
    port = 8889;
}


    export let connection = sql.createConnection({
        host     : "j8oay8teq9xaycnm.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        port     : 3306,
        user     : "c7tn28mg8fu5w2bz",
        password : "tkyccz0vsu49b75z",
        database : "c5mm0aic6ljm3kc5"
    })