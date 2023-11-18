import sql from "mysql";
<<<<<<< HEAD
    import os from "os"
=======
import os from "os"
>>>>>>> 0f3555f90a99cdd7292d724dcb5b190df0bf28db

let port = 3306;
if(os.platform() == "darwin") {
    port = 8889;
}

<<<<<<< HEAD

    export let connection = sql.createConnection({
        host     : "j8oay8teq9xaycnm.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        port     : 3306,
        user     : "c7tn28mg8fu5w2bz",
        password : "tkyccz0vsu49b75z",
        database : "c5mm0aic6ljm3kc5"
    })

=======
export let connection = sql.createConnection({        
    host     : process.env.host,
    port     : port,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database,
    insecureAuth: true
})
>>>>>>> 0f3555f90a99cdd7292d724dcb5b190df0bf28db
