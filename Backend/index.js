import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { DAO } from "./services/DAO.js";
import { createServer } from 'http';
import "./services/WebSockets.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const server = createServer(app);
//import cors from 'cors';


let dao = new DAO();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());



app.get("/messages", async( req, res) => {
    console.log(req.body);
    dao.getMessagesByUserId(req.body.id, (messages, error) => {
        if(error) {
            console.log(error);
        } else {
           return res.json(messages);
        }
    })
})

app.post("/messages", async (req, res) => {
    //let message = new Message(req.query.text, req.query.user_id, req.query.recipient_id);
    dao.createMessage(req.query.text, req.query.user_id, req.query.recipient_id, (message, error) => {
        if(error) {
            console.log(error);
        } else {
            return res.json(message);
        }
    })
})

app.delete("/messages", async (req, res) => {
    //let message = new Message(req.query.text, req.query.user_id, req.query.recipient_id);
    dao.deleteMessage(req.query.id, (message, error) => {
        if(error) {
            console.log(error);
        } else {
            return res.json(message);
        }
    })
})

app.get("/conversation", async(req, res) => {
    dao.getMessagesByConversation(req.query.user_id, req.query.recipient_id, (messages, error) => {
        if(error) {
            console.log(error);
        } else {
            return res.json(messages);
        }
    })
})

app.post("/conversation", async(req, res) => {
    dao.createConversation(req.query.user_id, req.query.recipient_id, req.query.user_name, req.query.recipient_name, (messages, error) => {
        if(error) {
            console.log(error);
        } else {
            return res.json(messages);
        }
    })
})

app.get("/conversationByUser", async(req, res) => {
    console.log(req.body)
    dao.getConversationByUserId(req.query.user_id, (conversations, error) => {
        if(error) {
            console.log(error);
        } else {
            return res.json(conversations);
        }
    })
})

app.get("/users", async(req, res) => {
    console.log(req.body)
    dao.getUserByEmail(req.query.email_address, (conversations, error) => {
        if(error) {
            console.log(error);
        } else {
            return res.json(conversations);
        }
    })
})

app.get("/getUserByUserId", async(req, res) => {
    console.log(req.body)
    dao.getUserByUserId(req.query.user_id, (conversations, error) => {
        if(error) {
            console.log(error);
        } else {
            return res.json(conversations);
        }
    })
})

app.get("/getAllUsers", async(req, res) => {
    dao.getAllUsers((conversations, error) => {
        if(error) {
            console.log(error);
        } else {
            return res.json(conversations);
        }
    })
})

app.post("/users", async(req, res) => {
    console.log(req.body)
    dao.createUser(req.query.user_id, req.query.email_address, req.query.firstName, req.query.lastName, (conversations, error) => {
        if(error) {
            console.log(error);
        } else {
            return res.json(conversations);
        }
    })
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

