const Database = require("../db/config")

module.exports ={
    async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let roomId = ""

        for (let x = 0; x < 6; x++) {
            roomId += Math.floor(Math.random()*10).toString()
        }

        await db.run(`
            INSERT INTO rooms(
                id,
                pass
            ) VALUES(
                ${Number(roomId)},
                ${pass}
            )`
        )

        await db.close()

        res.redirect(`/room/${roomId}`)
    }
}