import express from "express"
import dotenv from 'dotenv'
dotenv.config();
import { DAO } from "./services/DAO.js";
const app = express();
const port = 3000;

let dao = new DAO();

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
    let message = new Message(req.body.message, req.body.user_id, req.body.recipient_id);
    dao.createMessage(message, (error) => {
        if(error) {
            console.log(error);
        } else {
            return res.sendStatus(201);
        }
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})