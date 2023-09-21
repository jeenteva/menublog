const express = require("express");
const route = express.Router();
const connection = require("../database/db");

route.get("/", (req, res) => {
    res.render('./admin/index');
});

route.route('/dessert/add')
    .get((req,res)=>{
        res.render('./admin/dessert/add',{
            type : req.query.type,
            err : req.query.errcode
        });
    })
    .post((req,res)=>{
        /* 
        { baslik: '', resmi: '', name: '', content: '', price: '' }
        */
        const {baslik,resmi,name,content,price} = req.body;
        connection.query('INSERT INTO desserts (title, dessert_image, dessert_name, dessert_content, dessert_price) VALUES (?, ?, ?, ?, ?)', [baslik, resmi, name, content, price], (err,res1)=>{
            if(err !== null) {
                res.redirect('/admin/dessert/add?type=error&errcode='+err);
            } else {
                res.redirect('/admin/dessert/add?type=success');
            }
        });
    });

route.route('/dessert/all')
    .get((req,res)=>{
        connection.query('SELECT * FROM desserts', (err,dessert)=>{
            res.render('./admin/dessert/all',{
                dessert : dessert
            });
        });
    });

route.route('/dessert/edit/:id1')
    .get((req,res) => {
        connection.query('SELECT * FROM desserts WHERE id = ?', [req.params.id1], (err, dessert) => {
            console.log(req.params.id1, 'hereee1')
            if (err !== null || dessert.length === 0) {
                res.redirect('/');
            } else {
                res.render('./admin/dessert/edit', {
                    dessert : dessert,
                    type : req.query.type,
                    err: req.query.err
                });
            }
        });
    })
    .post((req, res) => {
        const { title, resmi, name, content, price, type } = req.body;
        console.log(req.body)
        if (type === 'update') {
            connection.query(
                'UPDATE desserts SET title = ?, dessert_image = ?, dessert_name = ?, dessert_content = ?, dessert_price = ? WHERE id = ?',
                [title, resmi, name, content, price, req.params.id1],
                (err, res1) => {
                    if (err !== null) {
                        res.redirect('/admin/dessert/edit/' + req.params.id1 + '?type=error&errcode=' + err);
                    } else {
                        res.redirect('/admin/dessert/edit/' + req.params.id1 + '?type=success');
                    }
                }
            );
        } else if (type === 'delete') {
            connection.query('DELETE FROM desserts WHERE id = ?', [req.params.id1], (err, res1) => {
                
                if (err !== null) {
                    res.redirect('/admin/dessert/edit/' + req.params.id1 + '?type=error&errcode=' + err);
                } else {
                    res.redirect('/admin/dessert/edit/' + req.params.id1 + '?type=success');
                }
            });
        }
    });
    

module.exports = route;
