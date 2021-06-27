const express = require('express');
const QuestionController = require('./controllers/question-controller')
const RoomController =     require('./controllers/room-controller')
const route = express.Router();

route.get('/', (req, res) => res.render("index", {page: 'enter-room'}))
route.get('/room/:room', RoomController.open)
route.get('/create-pass', (req, res) => res.render("index", {page: 'create-pass'}))

route.post('/create-room', RoomController.create)
route.post('/question/create/:room', QuestionController.create)
route.post('/enter-room', RoomController.enter)
//Formato que a formulário deve passar
route.post('/question/:room/:question/:action', QuestionController.index)

module.exports = route;