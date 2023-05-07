const express = require("express")

const app = express();
const cors = require('cors')
const { logger } = require('./middlewares')
app.use(logger)
app.use(cors())

// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require('./routes/index')
const blogRouter = require('./routes/blog')
const commentRouter = require('./routes/comment')
const imageRouter = require('./routes/image')
const userRouter = require('./routes/user')
const adminRouter  = require('./routes/admin')
const MenuRouter  = require('./routes/menu')
const reservation  = require('./routes/reserve')
const profile  = require('./routes/profile')
const promotion  = require('./routes/promo')
const forgot = require('./routes/pass')
app.use(indexRouter.router)
app.use(blogRouter.router)
app.use(commentRouter.router)
app.use(imageRouter.router)
app.use(userRouter.router)
app.use(adminRouter.router)
app.use(MenuRouter.router)
app.use(reservation.router)
app.use(profile.router)
app.use(promotion.router)
app.use(forgot.router)
app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})