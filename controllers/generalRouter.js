const Meal = require("../models/meal.js")
const express = require("express")
const generalRouter = express.Router()

generalRouter.get("/", function(req,res){
    res.render("index.hbs", {
        layout: false
    })
})

generalRouter.get("/menu", function(req,res){
    Meal.find(function(err, data) {
        if (err) {
            console.log("Fail to find data!")
        }
        else {
            console.log("Find data successfully!")
            data = data.map(value => value.toObject())
            res.render("menu.hbs", {
                data: data,
                layout: false
            })
        }
    })
})

generalRouter.get("/dash", function(req,res){
    Meal.find(function(err, data) {
        if (err) {
            console.log("Fail to find data!")
        }
        else {
            console.log("Find data successfully!")
            dish = data.map(value => value.toObject())
            res.render("admin-dash.hbs", {
                data: {
                    firstname: req.session.user.firstname,
                    dish: dish
                },
                layout: false
            })
        }
    })
})

module.exports = generalRouter
