import express from "express"
import cors from "cors";


import dotenv from 'dotenv'
dotenv.config();
import { DAO } from "./services/DAO.js";
const app = express();
const port = 3000;
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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})