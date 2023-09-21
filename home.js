const express = require("express");
const route = express.Router();
const connection = require("../database/db");

route.get("/", (req, res) => {
  // Veritabanı sorgularını ardışık olarak çalıştır
  connection.query("SELECT * FROM soups_salads", (err, saladsettings) => {
    if (err) {
      console.error(err);
      return res.redirect("/");
    }

    connection.query("SELECT * FROM main_course", (err, maincoursesettings) => {
      if (err) {
        console.error(err);
        return res.redirect("/");
      }

      connection.query("SELECT * FROM drinks", (err, drinksettings) => {
        if (err) {
          console.error(err);
          return res.redirect("/");
        }

        connection.query("SELECT * FROM desserts", (err, dessertsettings) => {
          if (err) {
            console.error(err);
            return res.redirect("/");
          }

          // Tüm sorgular başarıyla tamamlandığında şablona verileri ileterek render işlemi yapın
          res.render("./home/index", {
            saladsettings: saladsettings,
            maincoursesettings: maincoursesettings,
            drinksettings: drinksettings,
            dessertsettings: dessertsettings,
          });
        });
      });
    });
  });
});

module.exports = route;
