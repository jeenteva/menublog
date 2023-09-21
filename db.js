var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passsword: '',
    database: 'menublog'

})

connection.connect(function(err) {
    if (err) {
        console.error('Veri Bağlantısında Hata Meydana Geldi.' + err.stack)
        return;

    }
    console.log('Veritabanına Başarıyla Bağlanıldı.');

});

module.exports = connection