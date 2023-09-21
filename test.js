const nodemailer = require('nodemailer');

// E-posta gönderim ayarları
let transporter = nodemailer.createTransport({
    host: 'SMTP sunucu adresi',
    service: 'gmail',
    auth: {
        user: 'eposta-adresi@posta.uzanti',
        pass: 'e posta-şifresi'
    }
});

// E-posta gönderimini doğrula
transporter.verify(function(error, success) {
    if (error) throw error;
    console.log('Bağlantı başarıyla sağlandı.');
});

// Rezervasyon bilgileri
let email = 'alici@eposta.uzanti'; // Alıcı e-posta adresi
let telefonNumara = '555-555-5555';
let isimSoyisim = 'Ahmet Mehmet';
let kisiSayisi = 4;
let tarihAraligi = '10 Ekim - 15 Ekim';
let saat = '14:00';

// E-posta içeriği
let bilgiler = {
    from: 'Gönderen Adı Soyadı <eposta-adresi@eposta.uzanti>',
    to: email,
    subject: 'Rezervasyon Bilgileri',
    text: `Merhaba ${isimSoyisim},\n\nRezervasyon bilgileriniz aşağıda yer almaktadır:\n\n` +
        `Telefon Numarası: ${telefonNumara}\n` +
        `Kişi Sayısı: ${kisiSayisi}\n` +
        `Tarih Aralığı: ${tarihAraligi}\n` +
        `Saat: ${saat}\n\n` +
        'Teşekkür ederiz!',
    html: `<p>Merhaba ${isimSoyisim},</p>` +
        '<p>Rezervasyon bilgileriniz aşağıda yer almaktadır:</p>' +
        `<ul>` +
        `<li>Telefon Numarası: ${telefonNumara}</li>` +
        `<li>Kişi Sayısı: ${kisiSayisi}</li>` +
        `<li>Tarih Aralığı: ${tarihAraligi}</li>` +
        `<li>Saat: ${saat}</li>` +
        `</ul>` +
        '<p>Teşekkür ederiz!</p>'
};

// E-posta gönderimi
transporter.sendMail(bilgiler, function (error, info) {
    if (error) throw error;
    console.log('Rezervasyon Bilgileri Gönderildi: ' + info.response);
});
