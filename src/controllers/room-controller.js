const Database = require("../db/config")

module.exports ={
    async create(req, res){
        const db = await Database()
        const pass = req.body.password

        /* Gera um número aleatório para a room */
        let roomId = ""
        let roomIdExist = false

        do {
            for (let x = 0; x < 6; x++) {
                roomId += Math.floor(Math.random()*10).toString()
            }
            const roomsIdsDB = await db.all(`SELECT id FROM rooms`)
            roomIdExist = roomsIdsDB.some(id => id === roomId)
            if(!roomIdExist) {
                /* Inseri a sala no banco */
                await db.run(`
                    INSERT INTO rooms(
                        id,
                        pass
                    ) VALUES(
                        ${Number(roomId)},
                        ${pass}
                    )`
                )
            }
        } while (roomIdExist)
        

        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questions =     await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)

        let isNoQuestions

        if(questions.length == 0) {
            if(questionsRead.length ==0 ){
                isNoQuestions = true
            }
        }

        res.render("room", {roomId, questions, questionsRead, isNoQuestions})
    },

    enter(req, res) {
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
}