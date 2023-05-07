const express = require("express");
const router = express.Router();
const pool = require("../config");
const { isLoggedIn } = require('../middlewares')


router.get("/menu", function(req, res, next) {
    // Query data from 3 tables
    const promise1 = pool.query("SELECT * FROM menu WHERE menu_type = 'drink';");
    const promise2 = pool.query("SELECT * FROM menu WHERE menu_type = 'food';");
    //const promise4 = pool.query("SELECT * FROM users WHERE id=?", [
        //req.user.id,
    //]);

    // Use Promise.all() to make sure that all queries are successful
    Promise.all([promise1, promise2])
        .then((results) => {
            const [drinks, foodFields] = results[0];
            const [foods, drinkFields] = results[1];
            res.json({
                food: foods,
                drink: drinks,
                error: null,
            });

        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});
exports.router = router;