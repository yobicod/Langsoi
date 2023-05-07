const express = require("express");
const router = express.Router();
const pool = require("../config");


router.get("/promotion", function(req, res, next) {
    // Query data from 3 tables
    const promise1 = pool.query("SELECT * FROM promotion");
    //const promise4 = pool.query("SELECT * FROM users WHERE id=?", [
        //req.user.id,
    //]);

    // Use Promise.all() to make sure that all queries are successful
    Promise.all([promise1])
        .then((results) => {
            const [promotion, promoFields] = results[0];
            res.json({
                promos: promotion,
                error: null,
            });

        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});
exports.router = router;