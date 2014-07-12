import express = require("express")
import db = require("../db")

export function index(req: express.ExpressServerRequest, res: express.ExpressServerResponse){
    db.getUsers(function(users) {
        console.dir(users);
        res.render('index', { title: 'ImageBoard', users: users })
    });
};