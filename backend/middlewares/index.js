async function logger(req, res, next) {
    const timestamp = new Date().toISOString().substring(0, 19)
    console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`)
    next()
}


const pool = require("../config");

async function isLoggedIn(req, res, next) {
    let authorization = req.headers.authorization

    if (!authorization) {
        return res.status(401).send('You are not logged in')
    }

    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) {
        return res.status(401).send('You are not logged in')
    }

    // Check token
    const [tokens] = await pool.query('SELECT * FROM tokens WHERE token = ?', [part2])
    const token = tokens[0]
    if (!token) {
        return res.status(401).send('You are not logged in')
    }

    // Set user
    const [users] = await pool.query(
        'SELECT user_id, username, first_name, last_name, email, gender, phone, dob, user_type ' +
        'FROM user WHERE user_id = ?', [token.user_id]
    )
    req.user = users[0]

    next()
}

// async function isAdmin(req, res, next){
//     if (req.user.role === 'staff') {
//       return next()
//     }
//     else {
//       return res.status(403).send('You do not have permission to perform this action')
//     }

//   }
module.exports = {
    logger,
    isLoggedIn,
}