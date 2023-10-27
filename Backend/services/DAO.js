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

    createMessage(Message, callback) {
        connection.query("INSERT INTO messages (message, user_id, recipient_id) VALUES (?,?,?)", [Message.message, Message.user_id, Message.recipient_id], (err, results) => {
            if(err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }

    getMessagesByConversation(user_id, recipient_id, callback) {
        connection.query("SELECT * FROM messages WHERE user_id = ? AND recipient_id = ?", [user_id, recipient_id], (err, results) => {
            if(err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }
}