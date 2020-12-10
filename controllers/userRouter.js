const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/user.js")
const userRouter = express.Router()

userRouter.get("/login", function(req,res){
    if (req.session.user && req.session.user.role === true) {
        return res.redirect("/dash")
    }

    if (req.session.user && req.session.user.role === false) {
        return res.redirect("/cart-dash")
    }

    res.render("login.hbs", {
        layout: false
    })
})

userRouter.get("/signup", function(req,res){
    if (req.session.user) {
        return res.redirect("/dash")
    }

    res.render("signup.hbs", {
        layout: false
    })
})

userRouter.get("/logout", function(req,res){
    req.session.user = null
    res.redirect("/")
})

userRouter.post("/login", function(req,res){
    var message = ""
    if (!req.body.email || !req.body.password) {
        message = "Please enter username and password!"
        return res.render("login.hbs", {
            data: message,
            layout: false
        })
    }

    User.findOne({
        email: req.body.email
    }, async function(err, data) {
        if (err) {
            return console.log("Fail to find data!")
        }
        
        if (!bcrypt.compareSync(req.body.password, data.password)) {
            message = "Username or password is incorrect!"
            return res.render("login.hbs", {
                data: message,
                layout: false
            })
        }

        req.session.user = data
        if (data.role) {
            return res.redirect("/dash")
        }

        res.redirect("/menu")
    })
})

userRouter.post("/signup", async function(req,res){
    var message = ""
    regTwo = /^.{2,}$/
    regPass = /^.{6,12}$/

    //validate first name
    if (!req.body.firstname || !regTwo.test(req.body.firstname)) {
        if (!req.body.firstname) {
            message = "Please enter your first name!"
        }
        else {
            message = "First name should have at least two characters!"
        }

        return res.render("signup.hbs", {
            data: message,
            layout: false
        })
    }

    //validate last name
    if (!req.body.lastname || !regTwo.test(req.body.lastname)) {
        if (!req.body.lastname) {
            message = "Please enter your last name!"
        }
        else {
            message = "Last name should have at least two characters!"
        }

        return res.render("signup.hbs", {
            data: message,
            layout: false
        })
    }

    //validate email
    if (!req.body.email) {
        message = "Please enter your email!"

        return res.render("signup.hbs", {
            data: message,
            layout: false
        })
    }

    //validate password
    if (!req.body.password || !regPass.test(req.body.password)) {
        if (!req.body.password) {
            message = "Please enter your password!"
        }
        else {
            message = "Password should have 6 to 12 characters!"
        }

        return res.render("signup.hbs", {
            data: message,
            layout: false
        })
    }

    //check if email already exists
    User.findOne({
        email: req.body.email
    }, function(err, data) {
        if (err) {
            return console.log("Fail to find data!")
        }

        if (data) {
            message = "Email already exist!"
            return res.render("signup.hbs", {
                data: message,
                layout: false
            })
        }
    })

    //encrypt the password
    var salt = await bcrypt.genSalt(10)
    var encryptedPwd = await bcrypt.hash(req.body.password, salt)

    //create user
    var user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: encryptedPwd,
        role: false
    })
        
    user.save(function(err, data) {
        if (err) {
            console.log(err)
            return console.log("Fail to save data!")
        }

        res.redirect("/login")
    })
})

module.exports = userRouter
