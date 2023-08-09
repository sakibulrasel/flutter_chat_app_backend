require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoDB = require('./src/databases/mongodb/index');
const socketIO = require('socket.io');
const shared = require('./src/shared');
const MessageController = require('./src/controllers/MessageController');

const app = express();

app.use(express.json());
app.use(cors());

const server = require('http').createServer(app);
const io = socketIO(server);
shared.io = io;
process.env['MONGO_CONNECTION_STRING'] = 'mongodb+srv://sakibul:sakibul1991@doctorappointment.4solf.mongodb.net/?retryWrites=true&w=majority';
process.env['JWT_SECRET'] = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKrY6eHluyA96Ip1m5ZwmB1GFyV4Y0Gai523CY2U9z/pT/KnpIlGF/4YrHwShw548XOdezDWe91OsTazlmhredMCAwEAAQ==';
process.env['FCM_SERVER_TOKEN'] = 'AAAAp1_hWNY:APA91bH81vE160WXBkZGFDoARQp-93PKq87-e5ob8ZVwPZ7FmTxUyopdH9W_MW81aXFyiO2x-c173BEPHUgJdOsLpRijn8v33UuYhvwhddh9BDQK8znwetrkC2hPHLknZU7Lw99bSi6q';
let users = [];
shared.users = users;

io.on('connection', socket => {
    socket.on("user-in", (user) => {
        const newUser = { ...user, socket };
        users.push(newUser);
        console.log("user = ", user);
        socket.emit("user-in");
        shared.users = users;
        MessageController.getMessagesAndEmit(newUser);
    });
    
    socket.on("user-left", () => {
        users = users.filter(x => x.socket.id !== socket.id);
        shared.users = users;
    });

    socket.on("disconnect", () => {
        users = users.filter(x => x.socket.id !== socket.id);
        shared.users = users;
    });

});

app.use('/', require('./src/routes'));

server.listen('8081', () => {
    console.log("Listening on port 8081");
    mongoDB.connect();
});