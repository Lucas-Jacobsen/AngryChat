class Message {
    id = null;
    message = ""
    user_id = null;
    recipient_id = null;

    constructor(id, message, user_id, recipient_id) {
        this.id = id;
        this.message = message;
        this.user_id = user_id;
        this.recipient_id = recipient_id;
    }
}