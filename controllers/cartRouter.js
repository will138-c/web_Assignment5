const Meal = require("../models/meal.js")
const Cart = require("../models/cart.js")
const express = require("express")

const cartRouter = express.Router()

const VIEW_NAME = 'cart-dash.hbs';

cartRouter.get("/cart-dash", function(req,res){
    if (!req.session.user) {
        return res.redirect("/login")
    }

    Cart.find({
        useremail: req.session.user.email
    }, function(err, data) {
        if (err) {
            console.log("Fail to find data!")
        }
        else {
            console.log("Find data successfully!")
            dish = data.map(value => value.toObject())
            let total = 0
            for (let i = 0; i < dish.length; i++) {
                total += dish[i].price
            }
            res.render("cart-dash.hbs", {
                data: {
                    firstname: req.session.user.firstname,
                    dish: dish,
                    total: total
                },
                layout: false
            })
        }
    })
})

cartRouter.get("/cart-add", function(req,res){
    console.log(req.session.user.email)
    console.log(req.query.title)
    console.log(req.query.id)
    var cart = new Cart({
        useremail: req.session.user.email,
        id: req.query.id,
        itemtitle: req.query.title,
        price: req.query.price
    })
        
    cart.save(function(err, data) {
        if (err) {
            console.log(err)
            return console.log("Fail to save data!")
        }
    })
})

cartRouter.get("/cart-delete", function(req,res){
    Cart.deleteOne({
        useremail: req.session.user.email,
        itemtitle: req.query.title
    }, function(err, data) {
        if (err) {
            return console.log("Fail to delete data!")
        }
        console.log("Delete data successfully!")
        res.redirect("/cart-dash")
    })
})

cartRouter.get("/cart-placeorder", function(req,res){

    const sgMail = require("@sendgrid/mail");

    sgMail.setApiKey(process.env.SEN_GRID_API_KEY);
    let useremail = req.session.user.email;
    const msg={
        to: useremail,
        from:'zwang241@myseneca.ca',
        subject:'Thans for your order!',
        html:
            'We recived your order. We will delever it as soon as possible.'
    };

    sgMail.send(msg)
        .then(()=>{
            console.log('send mail success!');
            res.redirect("/menu.hbs");
        })
        .catch(err=>{
            console.log(`Erro ${err}`);
            res.redirect("/cart-dash")
        });


    Cart.deleteMany({
        useremail: req.session.user.email
    }, function(err, data) {
        if (err) {
            return console.log("Fail to delete data!")
        }
        res.redirect("menu")
    })
})

module.exports = cartRouter