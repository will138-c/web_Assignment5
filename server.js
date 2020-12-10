//database
require("./models/connection.js")

//express
const HTTP_PORT = process.env.PORT || 8080
const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const session = require("express-session")
const path = require("path")
const generalRouter = require("./controllers/generalRouter.js")
const userRouter = require("./controllers/userRouter.js")
const mealRouter = require("./controllers/mealRouter.js")
const cartRouter = require("./controllers/cartRouter.js")
const dotenv = require("dotenv");

dotenv.config({path:'./config/keys.env'});

const app = express()

//setting
app.engine('.hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', '.hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized:true
}))

app.use(express.static(path.join(__dirname, "public")))

app.use(generalRouter)
app.use(userRouter)
app.use(mealRouter)
app.use(cartRouter)

//listen
app.listen(HTTP_PORT)
