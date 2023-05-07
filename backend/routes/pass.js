const express = require("express")
const pool = require("../config")
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token"); //สร้าง  token
const { isLoggedIn } = require('../middlewares');
const router = express.Router();

const phoneNumberValidator = async (value, helpers) => {
    const [rows, fields] = await pool.query(
        "SELECT phone FROM user WHERE phone = ?",
        [value]
    )
    if (rows.length > 0) {
        return value //ถ้า validate ผ่าน return ค่ากลับไป
    }

    const message = 'This phone is not in'
    throw new Joi.ValidationError(message, { message })
}

const usernameIsInValidator = async (value, helpers) => {
    const [rows, fields] = await pool.query(
        "SELECT username FROM user WHERE username = ?",
        [value]
    )
    if (rows.length <= 0) {
        const message = 'This user is not in'
        // return false
        throw new Joi.ValidationError(message, { message })

    }
    return value //ถ้า validate ผ่าน return ค่ากลับไป

}
const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) { //สร้างเงื่อนไข password
        throw new Joi.ValidationError('Password must be harder')
    }
    return value //ถ้า validate ผ่าน return ค่ากลับไป
}
const newpassSchema = Joi.object({ // สร้าง schema
    phone: Joi.string().required().pattern(/0[0-9]{9}/).external(phoneNumberValidator),
    new_password: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().valid(Joi.ref('new_password')),
    username: Joi.string().required().min(5).external(usernameIsInValidator), //external ใช้ข้อมูลจาก sql data
})
const userFind = Joi.object({ // สร้าง schema
    phone: Joi.string().required().pattern(/0[0-9]{9}/).external(phoneNumberValidator),
    username: Joi.string().required().min(5).external(usernameIsInValidator), //external ใช้ข้อมูลจาก sql data
})
// router.get("/forgetpass", function(req, res, next) {

//     // Query data from 3 tables
//     const promise1 = pool.query("SELECT * FROM menu;");

//     const promise2 = pool.query("SELECT * FROM reservation JOIN user USING (user_id);");
//     const promise3 = pool.query("SELECT * FROM promotion;");

//     // Use Promise.all() to make sure that all queries are successful
//     Promise.all([promise1, promise2, promise3])
//         .then((results) => {
//             const [menus, menuFields] = results[0];
//             const [reservations, reservationFields] = results[1];
//             const [promotions, promotionFields] = results[2];
//             res.json({
//                 menu: menus,
//                 reservation: reservations,
//                 promotion: promotions,
//                 error: null,
//             });
//         })
//         .catch((err) => {
//             return res.status(500).json(err);
//         });
// });
router.post('/forgetpass/getuser', async (req, res, next) => {
    try {
        await userFind.validateAsync(req.body, { abortEarly: false }) //true validate ทีละฟิล false ทุกฟิลแล้วค่อยกลับมา
    }
    catch (err) {
        return res.status(400).json(err)
    }
    const username = req.body.username
    const phone = req.body.phone
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try { //ส่วนเพิ่มเข้า database
        let results = await conn.query(
            "SELECT password FROM user where username = ? and phone = ?",
            [username, phone]
        )
        conn.commit()
        res.send('found!')
        // res.status(201).send()
        // res.status(200).send(results)
        // console.log({'results' : results})

    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})


router.put('/forgetpass/change', async (req, res, next) => {
    try {
        await newpassSchema.validateAsync(req.body, { abortEarly: false }) //true validate ทีละฟิล false ทุกฟิลแล้วค่อยกลับมา
    }
    catch (err) {
        return res.status(400).json(err)
    }
    const username = req.body.username
    const password = await bcrypt.hash(req.body.new_password, 5) //encrypt password
    const phone = req.body.phone
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try { //ส่วนเพิ่มเข้า database
        let results = await conn.query(
            "UPDATE user SET password = ? where username = ?",
            [password, username]
        )
        conn.commit()
        res.send('changed')
        res.status(201).send()

    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})

exports.router = router;