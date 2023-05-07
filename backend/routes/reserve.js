const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require('../middlewares')
router = express.Router();


router.post("/reservation/res_in", isLoggedIn, async function(req, res, next) {
    //console.log(req.body)
    let id = req.user.user_id
    let date_res = req.body.date
    let time_res = req.body.time
    let people_res = req.body.people
    let full_time_res = date_res+' '+ time_res
    //console.log(date_res, time_res, people_res)
    var today = new Date();
    var today_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //console.log(full_time_res)
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try{
        const [row3, fields3] = await conn.query("select `table_id` FROM `table` where `table_id` not in (SELECT table_id FROM `reserve_table` JOIN `reservation` USING (`res_no`) JOIN `table` USING (`table_id`) WHERE (`res_time` = ? and `seat` >= ?)) and `seat` >= ?", [full_time_res, people_res, people_res])
        if(!row3.length){
            return res.json({isfull:true, text:'Reserve is full'})
        }

        const [row1, fields1]= await conn.query("INSERT INTO `reservation` (`res_seat`, `res_date`, `booking_date`, `res_time`,  `user_id`) VALUES (?, ?, ?, ?, ?)",[people_res, date_res, today_date, full_time_res, id])
        var res_no = row1.insertId

        // const [row2, fields2] = await conn.query("SELECT table_id FROM `table` WHERE seat >= ?;", [people_res])
        // console.log(row2)
        table_to_res = row3[0].table_id
        await conn.query("INSERT INTO `reserve_table` (`res_no`, `table_id`) VALUES (?, ?)", [res_no, table_to_res])

        await conn.commit()
        return res.json({isfull:false, text:'Normal'})
    }catch(err){
        await conn.rollback();
        res.status(500).json(err)
    }finally{
        conn.release();
    }


});


exports.router = router;