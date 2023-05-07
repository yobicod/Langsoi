const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const multer = require("multer");
const bodyparser = require('body-parser')
const { isLoggedIn } = require('../middlewares')
router = express.Router();

const isAdmin = async (req, res, next) => {
    console.log(req.user)
    if (req.user.user_type === 'staff') {
        return next()
    }

    else {
      return res.status(403).send('You do not have permission to perform this action')
    }


  }

// router.get("/adminpanel", async function (req, res, next) {
//   try {
//     const search = req.query.search || ''
//     let sql = 'SELECT a.*, b.file_path FROM blogs AS a LEFT JOIN (SELECT * FROM images WHERE main=1) AS b ON a.id = b.blog_id;'
//     let cond = []

//     if (search.length > 0) {
//       sql = 'SELECT a.*, b.file_path FROM blogs AS a LEFT JOIN (SELECT * FROM images WHERE main=1) AS b ON a.id = b.blog_id WHERE a.title LIKE ? OR a.content LIKE ?;'
//       cond = [`%${search}%`, `%${search}%`]
//     }
//     const [rows, fields] = await pool.query(sql, cond);
//     return res.json(rows);
//   } catch (err) {
//     return res.status(500).json(err)
//   }
// });
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './static/uploads')
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  const upload = multer({ storage: storage })


router.get("/adminpanel", isLoggedIn, isAdmin, function(req, res, next) {

    // Query data from 3 tables
    const promise1 = pool.query("SELECT * FROM menu;");

    const promise2 = pool.query("SELECT * FROM reservation JOIN user USING (user_id);");
    const promise3 = pool.query("SELECT * FROM promotion;");

    // Use Promise.all() to make sure that all queries are successful
    Promise.all([promise1, promise2, promise3])
        .then((results) => {
            const [menus, menuFields] = results[0];
            const [reservations, reservationFields] = results[1];
            const [promotions, promotionFields] = results[2];
            res.json({
                menu: menus,
                reservation: reservations,
                promotion: promotions,
                error: null,
            });
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});

router.post("/adminpanel/addmenu", isLoggedIn, isAdmin, upload.single('myImage'), async function(req, res, next) {
    // console.log(req.body)
    // console.log(req.file)

    const file = req.file;
    let pathArray = [];
    // let pathArray = [];
    if (!file) {
        return res.status(400).json({ message: "Please upload a file" });
    }

    let menu_name = req.body.name
    let menu_price = req.body.price
    let menu_detail = req.body.detail
    let menu_type = req.body.type
    let menu_pic = req.body.myImage

    // console.log(menu_name)
    // console.log(menu_price)
    // console.log(menu_detail)
    // console.log(menu_type)
    // console.log(menu_pic)
    let minipath =  req.file.path.substring(6)
    console.log(minipath)

    //console.log(date_res, time_res, people_res)
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var today_time = day + ' ' + time
    //console.log(full_time_res)
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try{

        const [menu1, menu_fields1]= await conn.query("INSERT INTO `menu` (`menu_name`, `menu_type`, `price`, `detail`, `path`) VALUES (?, ?, ?, ?, ?)",[menu_name, menu_type, menu_price, menu_detail, minipath])
        var menu_id_cur = menu1.insertId;
        await conn.query("INSERT INTO `staff_menu` (`user_id`, `menu_id`, `time_edit`) VALUES (?, ?, ?)", [2, menu_id_cur, today_time])

        await conn.commit()
        return res.send()
    }catch(err){
        await conn.rollback();
        res.status(500).json(err)
    }finally{
        conn.release();
    }
});

router.put("/adminpanel/editmenu", isLoggedIn, isAdmin, upload.single('myImage'), async function(req, res, next) {

    const file = req.file;
    let pathArray = [];
    // let pathArray = [];
    if (!file) {
        return res.status(400).json({ message: "Please upload a file" });
    }
    let menu_name = req.body.name
    let menu_price = req.body.price
    let menu_detail = req.body.detail
    let menu_type = req.body.type
    let menu_id = req.body.id
    let minipath =  req.file.path.substring(6)
    //console.log(date_res, time_res, people_res)
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var today_time = day + ' ' + time
    //console.log(full_time_res)
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try{

        const [menu2, menu_fields1]= await conn.query("UPDATE `menu` SET `menu_name` = ?, `menu_type` = ?, `price` = ?, `detail` = ?, path = ? WHERE (`menu_id` = ?);",[menu_name, menu_type, menu_price, menu_detail, minipath, menu_id])

        await conn.query("INSERT INTO `staff_menu` (`user_id`, `menu_id`, `time_edit`) VALUES (?, ?, ?)", [2, menu_id, today_time])

        await conn.commit()
        return res.send()
    }catch(err){
        await conn.rollback();
        res.status(500).json(err)
    }finally{
        conn.release();
    }
});

router.delete("/adminpanel/deletemenu/:menuid", isLoggedIn, isAdmin, async function(req, res, next) {

    let menu_id = req.params.menuid
    //console.log(date_res, time_res, people_res)
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var today_time = day + ' ' + time
    //console.log(full_time_res)
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try{
        await conn.query("DELETE FROM `staff_menu` WHERE (`menu_id` = ?);", [menu_id])
        await conn.query("DELETE FROM `menu` WHERE (`menu_id` = ?);", [menu_id])

        await conn.commit()
        return res.send()
    }catch(err){
        await conn.rollback();
        res.status(500).json(err)
    }finally{
        conn.release();
    }
});

router.put("/adminpanel/editreservation", isLoggedIn, isAdmin, async function(req, res, next) {

    let res_id = req.body.res_no
    let res_date = req.body.date
    let res_time = req.body.time
    let res_seat = req.body.seat
    let res_full_time = res_date + " " + res_time
    //console.log(date_res, time_res, people_res)
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var today_time = day + ' ' + time
    //console.log(res_full_time)
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try{
        const [res1, res_fields1] = await conn.query("UPDATE `reservation` SET `res_seat` = ?, `res_date` = ?, `res_time` = ? WHERE (`res_no` = ?);", [res_seat, res_date, res_full_time, res_id])
        await conn.query("INSERT INTO `staff_reservation` (`user_id`, `res_no`, `time_edit`) VALUES (?, ?, ?);", [2, res_id, today_time])
        await conn.commit()
        return res.send()
    }catch(err){
        await conn.rollback();
        res.status(500).json(err)
    }finally{
        conn.release();
    }
});

router.delete("/adminpanel/deletres/:res_no", isLoggedIn, isAdmin, async function(req, res, next) {

    let res_no = req.params.res_no
    //console.log(date_res, time_res, people_res)
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var today_time = day + ' ' + time
    //console.log(full_time_res)
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try{

        await conn.query("DELETE FROM `staff_reservation` WHERE (`res_no` = ?);", [res_no])
        await conn.query("DELETE FROM `reserve_table` WHERE (`res_no` = ?);", [res_no])
        await conn.query("DELETE FROM `reservation` WHERE (`res_no` = ?);", [res_no])


        await conn.commit()
        return res.send()
    }catch(err){
        await conn.rollback();
        res.status(500).json(err)
    }finally{
        conn.release();
    }
});

router.post("/adminpanel/addpromotion", isLoggedIn, isAdmin,  upload.single('myImage'), async function(req, res, next) {
    const file = req.file;
    let pathArray = [];
    // let pathArray = [];
    if (!file) {
        return res.status(400).json({ message: "Please upload a file" });
    }
    let promo_name = req.body.name
    let promo_start_date = req.body.start_date
    let promo_end_date = req.body.end_date
    let promo_discount = req.body.discount
    let promo_detail = req.body.detail
    let minipath =  req.file.path.substring(6)
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var today_time = day + ' ' + time
    //console.log(full_time_res)
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try{

        const [promo1, promo_fields1]= await conn.query("INSERT INTO `promotion` (`state_date`, `end_date`, `detail`, `discount`, `path`, `promotion_name`) VALUES (?, ?, ?, ?, ?, ?);",[promo_start_date, promo_end_date, promo_detail, promo_discount, minipath, promo_name])

        var pro_id_cur = promo1.insertId;

        await conn.query("INSERT INTO `staff_promotion` (`time_edit`, `user_id`, `promotion_id`) VALUES (?, ?, ?)", [today_time, 2, pro_id_cur])

        await conn.commit()
        return res.send()
    }catch(err){
        await conn.rollback();
        res.status(500).json(err)
    }finally{
        conn.release();
    }
});

router.put("/adminpanel/editpromotion", isLoggedIn, isAdmin, upload.single('myImage'), async function(req, res, next) {
    const file = req.file;
    let pathArray = [];
    // let pathArray = [];
    if (!file) {
        return res.status(400).json({ message: "Please upload a file" });
    }

    let promo_id = req.body.id
    let promo_name = req.body.name
    let promo_start_date = req.body.start_date
    let promo_end_date = req.body.end_date
    let promo_discount = req.body.discount
    let promo_detail = req.body.detail
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var today_time = day + ' ' + time
    let minipath =  req.file.path.substring(6)
    //console.log(full_time_res)
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try{

        const [promo2, promo_fields2]= await conn.query("UPDATE `promotion` SET `state_date` = ?, `end_date` = ?, `detail` = ?, `discount` = ?, `promotion_name` = ?, `path` = ? WHERE (`promotion_id` = ?);",[promo_start_date, promo_end_date, promo_detail, promo_discount, promo_name, minipath, promo_id])


        await conn.query("INSERT INTO `staff_promotion` (`time_edit`, `user_id`, `promotion_id`) VALUES (?, ?, ?)", [today_time, 2, promo_id])

        await conn.commit()
        return res.send()
    }catch(err){
        await conn.rollback();
        res.status(500).json(err)
    }finally{
        conn.release();
    }
});

router.delete("/adminpanel/deletepromo/:pro_id", isLoggedIn, isAdmin, async function(req, res, next) {

    let promo_id = req.params.pro_id
    //console.log(date_res, time_res, people_res)
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var today_time = day + ' ' + time
    //console.log(full_time_res)
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try{
        await conn.query("DELETE FROM `staff_promotion` WHERE (`promotion_id` = ?);", [promo_id])

        await conn.query("DELETE FROM `promotion` WHERE (`promotion_id` = ?);", [promo_id])

        await conn.commit()
        return res.send()
    }catch(err){
        await conn.rollback();
        res.status(500).json(err)
    }finally{
        conn.release();
    }
});

// router.get("/stock", function(req, res, next) {

//     // Query data from 3 tables
//     const promise1 = pool.query("SELECT * FROM ingredient where ingr_type = 'food';");

//     const promise2 = pool.query("SELECT * FROM ingredient where ingr_type = 'beverage';");


//     //const promise4 = pool.query("SELECT * FROM users WHERE id=?", [
//         //req.user.id,
//     //]);

//     // Use Promise.all() to make sure that all queries are successful
//     Promise.all([promise1, promise2])
//         .then((results) => {
//             const [foods, foodFields] = results[0];
//             const [beverages, beverageFields] = results[1];
//             res.json({
//                 food: foods,
//                 beverage: beverages,
//                 error: null,
//             });
//         })
//         .catch((err) => {
//             return res.status(500).json(err);
//         });
// });


exports.router = router;