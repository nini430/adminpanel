import mysql from "mysql";


export const db=mysql.createConnection({
    host:"eu-cdbr-west-03.cleardb.net",
    user:"b1f1578d9b7f49",
    password:"33ee027d",
    database:"heroku_dfa86ab56684479"
})

// mysql://b1f1578d9b7f49:33ee027d@eu-cdbr-west-03.cleardb.net/heroku_dfa86ab56684479?