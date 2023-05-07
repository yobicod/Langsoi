const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require('../middlewares')
router = express.Router();
const multer = require("multer");
const path = require("path");
const Joi = require('joi')
const bcrypt = require('bcrypt');



const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) { //สร้างเงื่อนไข password
        throw new Joi.ValidationError('Password must be harder')
    }
    return value //ถ้า validate ผ่าน return ค่ากลับไป
}

const editSchema = Joi.object({ // สร้าง schema
    first_name: Joi.string().required().min(5).max(150),
    last_name: Joi.string().required().min(5).max(150),
    email: Joi.string().required().email().max(100),
    phone: Joi.string().required().pattern(/0[0-9]{9}/),
    dob: Joi.date().iso().required(),
    gender: Joi.string().required(),
})



var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './static/uploads')
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  const upload = multer({ storage: storage })


router.put("/user/profile/edit", isLoggedIn, upload.single('myImage'), async function(req, res, next) {

    const file = req.file;
    let pathArray = [];
    // let pathArray = [];
    if (!file) {
        return res.status(400).json({ message: "Please upload a file" });
    }
    let minipath =  req.file.path.substring(6)
    let user_id = req.body.id
    let f_name = req.body.fname
    let l_name = req.body.lname
    let gender = req.body.gender
    let phone = req.body.phone
    let email = req.body.email


    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try{
        await conn.query("UPDATE `user` SET `first_name` = ?, `last_name` = ?, `gender` = ?, `phone` = ?, `email` = ?, `path` = ? WHERE (`user_id` = ?);", [f_name, l_name, gender, phone, email, minipath, user_id])
        await conn.commit()
        return res.send()
    }catch(err){
        await conn.rollback();
        res.status(500).json(err)
    }finally{
        conn.release();
    }

});



router.get("/user/profile/:user_id", isLoggedIn, function(req, res, next) {

    const promise1 = pool.query("SELECT * FROM user WHERE user_id=?;", [req.params.user_id]);
    const promise2 = pool.query("SELECT * FROM reservation WHERE user_id=?;", [req.params.user_id]);
    Promise.all([promise1, promise2]).then((results) => {
            const [user] = results[0];
            const [reservation] = results[1];
            //console.log(results)
            //console.log(req.params.user_id)
            res.json({
                user: user,
                res: reservation,
                error: null,
            });

        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});


const editpass_Schema = Joi.object({ // สร้าง schema
    password: Joi.string().required().custom(passwordValidator),
    new_password: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().valid(Joi.ref('new_password')),
    id: Joi.required()

})

router.put("/user/profile/changepassword", isLoggedIn, async function(req, res, next) {
    try {
        await editpass_Schema.validateAsync(req.body, { abortEarly: false }) //true validate ทีละฟิล false ทุกฟิลแล้วค่อยกลับมา
    }
    catch (err) {
        return res.status(400).json(err)
    }
    
    let new_pass = await bcrypt.hash(req.body.new_password, 5);
    console.log(req.body)
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try{
        const [users] = await conn.query(
            'SELECT * FROM user WHERE user_id = ?',
            [req.body.id]
        )
        const user = users[0]
        if (!(await bcrypt.compare(req.body.password, user.password))) {
            res.sent('Incorrect username or password')
        }

        await pool.query('UPDATE user SET password = ? WHERE user_id =  ?', [new_pass, req.body.id])

        await conn.commit()
        return res.send()
    }catch(err){
        await conn.rollback();
        res.status(500).json(err)
    }finally{
        conn.release();
    }

});



exports.router = router;