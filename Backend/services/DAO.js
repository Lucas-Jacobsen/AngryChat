import { connection } from "../database/connection.js";
export class DAO {
    constructor() {
    }

    getMessagesByUserId(id, callback) {
        connection.query("SELECT * FROM messages WHERE user_id = ?", [id] , (err, results, fields) => {
            if(err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }

    getUserByUserId(user_id, callback) {
        connection.query("SELECT * FROM users WHERE user_id = ?", [user_id] , (err, results, fields) => {
            if(err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }

    createMessage(text, user_id, recipient_id, callback) {
        connection.query("INSERT INTO messages (text, user_id, recipient_id) VALUES (?,?,?)", [text, user_id, recipient_id], (err, results) => {
            if(err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }

    deleteMessage(id, callback) {
        connection.query("DELETE FROM messages WHERE id = ?", [id], (err, results) => {
            if(err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }

    getMessagesByConversation(user_id, recipient_id, callback) {
        connection.query("SELECT * FROM messages WHERE (user_id = ? AND recipient_id = ?) OR (user_id = ? AND recipient_id = ?)", [user_id, recipient_id, recipient_id, user_id], (err, results) => {
            if(err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }

    createConversation(user_id, recipient_id, user_name, recipient_name, callback) {
        connection.query("INSERT INTO conversations (user_id, recipient_id, user_name, recipient_name) VALUES (?,?,?,?)", [user_id, recipient_id, user_name, recipient_name], (err, results) => {
            if(err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }

    getConversationByUserId(user_id, callback) {
        connection.query("SELECT * FROM conversations WHERE user_id = ? or recipient_id = ?", [user_id, user_id], (err, results) => {
            if(err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }

    getUserByEmail(email, callback) {
        connection.query("SELECT * FROM users WHERE email_address = ?", [email], (err, results) => {
            if(err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }

    createUser(user_id, email, firstName, lastName, callback) {
        connection.query("INSERT INTO users (user_id, email_address, firstName, lastName) VALUES (?,?,?,?)", [user_id, email, firstName, lastName], (err, results) => {
            if(err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }

    getAllUsers(callback) {
        connection.query("SELECT * FROM users", (err, results) => {
            if(err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }
    
}