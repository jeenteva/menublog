const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'SMTP sunucu adresi',
    service: 'gmail',
    auth: {
        user: 'eposta-adresi@posta.uzanti',
        pass: 'e posta-şifresi'
    }

});
transporter.verify(function(error, success) {
    if (error) throw error;

    console.log('Bağlantı başarıyla sağlandı.');
});

let bilgiler = {
    from: 'Gönderen Adı Soyadı <eposta-adresi@eposta.uzanti>',
    to: 'gönderilen-eposta-adresi@eposta.uzanti',
    subject: 'Eposta konu başlığı',
    text: 'Eposta metin içeriği',
    html: 'Eposta <b>HTML metin içeriği</b>'
};

transporter.sendMail(bilgiler, function (error, info) {
    if (error) throw error;
    
    console.log('E-posta gönderildi.' + info.response);
});

