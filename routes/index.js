var express = require('express');
var router = express.Router();
const https = require('https');



router.get('/', function(req, res, next) {

    https.get('https://api.mercadolibre.com/sites', (response) => {

        var info = '';
        response.on('data', (d) => {
            //process.stdout.write(d);
            info += d;
        });

        response.on('end', () => {
            res.render('index', { sites: JSON.parse(info) });
        });

    }).on('error', (e) => {
        console.error(e);
    });


  //res.render('index');
});

router.post('/trends', function(req, res, next) {


    var pais = req.body.pais;
    var categoria = req.body.categoria;
    const columns = parseInt(req.body.columnas);
    const rows = parseInt(req.body.filas);

    var finalUrl = "https://api.mercadolibre.com/trends/" + pais;

    if (categoria != "") {
        finalUrl += "/" + categoria;
    }

    https.get(finalUrl, (response) => {

        var info = '';
        response.on('data', (d) => {
            //process.stdout.write(d);
            info += d;
        });

        /*response.on('end', () => {
            res.render('trendsss', { trendss: JSON.parse(info) });
        });
*/



        response.on('end', () => {
            var trendsData = JSON.parse(info);
            var trendsArray = new Array(rows);
            for(var i = 0; i < trendsArray.length; i++) {
                trendsArray[i] = trendsData.slice(i*rows, i*rows+columns);
            }
            res.render('trendsss', { trendss: trendsArray });
        });




    }).on('error', (e) => {
        console.error(e);
    });

    //process.stdout.write(texto);
    //res.render('trend', { title: texto });
});

module.exports = router;
