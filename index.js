const express = require("express");
const app = express();
const port= 4000;
const bodyParser = require("body-parser");
const {initDB} = require('./services/backup');

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

initDB(( err, {fuelModel, saveDB}) =>{
    if(err){
        return console.log("Hiba történt!", err);
    }
    require("./router/router")(app, {fuelModel, saveDB});
    app.listen(port, () =>{
        console.log(`Várom a kéréseket a következő porton: ${port}!`)
    })

})