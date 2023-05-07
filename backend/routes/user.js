const express = require("express")
const pool = require("../config")
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token"); //สร้าง  token
const { isLoggedIn } = require('../middlewares')
router = express.Router();




const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) { //สร้างเงื่อนไข password
        throw new Joi.ValidationError('Password must be harder')
    }
    return value //ถ้า validate ผ่าน return ค่ากลับไป
}


const usernameValidator = async (value, helpers) => {
    const [rows, fields] = await pool.query(
        "SELECT username FROM user WHERE username = ?",
        [value]
    )
    if (rows.length > 0) {
        const message = 'This user is already taken'
        throw new Joi.ValidationError(message, { message })
    }
    return value //ถ้า validate ผ่าน return ค่ากลับไป
}

const signupSchema = Joi.object({ // สร้าง schema
    first_name: Joi.string().required().min(5).max(150),
    last_name: Joi.string().required().min(5).max(150),
    email: Joi.string().required().email().max(100),
    phone: Joi.string().required().pattern(/0[0-9]{9}/),
    password: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
    username: Joi.string().required().min(5).external(usernameValidator), //external ใช้ข้อมูลจาก sql data
    dob: Joi.date().iso().required(),
    gender: Joi.string().required(),
})



router.post('/user/signup', async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false }) //true validate ทีละฟิล false ทุกฟิลแล้วค่อยกลับมา
    }
    catch (err) {
        return res.status(400).json(err)
    }
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const username = req.body.username
    const password = await bcrypt.hash(req.body.password, 5) //encrypt password
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const phone = req.body.phone
    const dob = req.body.dob
    const gender = req.body.gender

    try { //ส่วนเพิ่มเข้า database
        const [row, field] = await conn.query(
            'INSERT INTO user(username, password, first_name, last_name, email, phone, gender, dob, user_type) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, "member")',[username, password, first_name, last_name, email, phone, gender, dob]

        )
        await conn.query(
            'INSERT INTO member(user_id) ' +
            'VALUES (?)',[row.insertId]

        )
        // await conn.query('INSERT INTO member()')
        conn.commit()
        res.send('added')
        res.status(201).send()

    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})

const loginSchema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })

    router.post('/user/login', async (req, res, next) => {
        console.log(req.body.password)
        try {
            await loginSchema.validateAsync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).send(err)
        }
        const username = req.body.username
        const password = req.body.password
        const conn = await pool.getConnection()
        await conn.beginTransaction()

        try {
            // Check if username is correct
            const [users] = await conn.query(
                'SELECT * FROM user WHERE username=?',
                [username]
            )
            const user = users[0]
            console.log(user.username)
            if (!user) {
                console.log('Incorrect username or password')
                return res.status(400).json('Incorrect username or password')
            }

            // Check if password is correct
            if (!(await bcrypt.compare(password, user.password))) {
                console.log('Incorrect username or password')
                return res.status(400).json('Incorrect username or password')
            }

            // Check if token already existed
            const [tokens] = await conn.query(
                'SELECT * FROM tokens WHERE user_id=?',
                [user.user_id]
            )
            let token = tokens[0]?.token
            // const [role] = await conn.query(
            //     'SELECT user_type from user where user_id=?', [user.user_id]
            // )

            console.log(token)
            if (!token) {
                // Generate and save token into database
                token = generateToken()
                // console.log(token)
                await conn.query(
                    'INSERT INTO tokens(user_id, token) VALUES (?, ?)',
                    [user.user_id, token]
                )
            }
            console.log("success")
            conn.commit()
            return res.status(200).json({'token': token, 'role': user.user_type})
        } catch (error) {
            conn.rollback()
            console.log(error)
            return res.status(400).json(error.toString())
        } finally {
            conn.release()
        }
    })

    router.get('/user/me',isLoggedIn, async (req, res, next) => {
        // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
        let token = req.headers.authorization.split(" ")[1]
        try{
            const [token_user] = await pool.query(
                'SELECT * FROM tokens WHERE token=?',
                [token]
            )
            const [user] = await pool.query(
                'SELECT * FROM user WHERE user_id=?',
                [token_user[0].user_id]
            )
            res.status(200).json(user[0])
        }
        catch(error){
            console.log(error)
        }

    })
exports.router = router