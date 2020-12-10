const Meal = require("../models/meal.js")
const express = require("express")
const multer = require("multer")
const path = require("path")

const mealRouter = express.Router()

const storage = multer.diskStorage({
    destination: "./public/images/",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

mealRouter.get("/dish-add", function(req, res) {
    res.render("admin-adddish.hbs", {
        layout: false
    })
})

mealRouter.post("/dish-add", upload.single("photo"), function(req,res){
    console.log(req.body)

    var meal = new Meal({
        id:req.body.id,
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
        category: req.body.category,
        servings: req.body.servings,
        calories: req.body.calories,
        price: req.body.price,
        top: req.body.top,
        photo: req.file.filename
    })
        
    meal.save(function(err, data) {
        if (err) {
            console.log(err)
            return console.log("Fail to save data!")
        }

        res.redirect("/dash")
    })
})

mealRouter.get("/dish-delete", function(req, res) {
    Meal.deleteOne({
        title: req.query.title
    }, function(err, data) {
        if (err) {
            console.log("Fail to delete data!")
        }
        else {
            console.log("Delete data successfully!")
        }
        res.redirect("/dash")
    })
})

module.exports = mealRouter