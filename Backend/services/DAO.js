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

    getConversationByUserId(user_id, callback) {
        connection.query("SELECT * FROM conversations WHERE user_id = ? or recipient_id = ?", [user_id, user_id], (err, results) => {
            if(err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }
}