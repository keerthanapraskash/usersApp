const express = require('express');
const { engine } =  require('express-handlebars');
var bodyParser = require('body-parser')
const User = require('./db.js')

const app = express();
app.use(express.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

app.get('/', (req, res) => {
    res.render('form');
}); 

app.post('/create', (req, res) => {
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let introduction = req.body.introduction;
    let email = req.body.email;
    let phone = req.body.phone;
    let experience = req.body.experience;
    let achievements = req.body.achievements;
    
    const detatils = {
        firstName:firstName,
        lastName: lastName,
        introduction: introduction,
        email: email,
        phone : phone,
        experience : experience,
        achievements :achievements,
    }
    console.log(req.body)

    User.query("INSERT INTO User SET ?", detatils, (err, res) => {
        if (err) {
        console.log("error: ", err);
        
        return;
        }
    
        console.log("created User: ", { id: res.insertId });
        
    });

})


app.get("/list", (req,res) => {
    User.query("SELECT * FROM user", (err, res) => {
        if (err) {
        console.log("error: ", err);
        return;
        }
        res.render('userlist', {users: res})  
    });
})

app.get("/listuser/:id", (req,res) => {
    let id = req.params.id;
    
    User.query("SELECT * FROM user WHERE id = ?",id, (err, res) => {
        if (err) {
        console.log("error: ", err);
        return;
        }
        console.log(res)
        res.render('detail', {user:res})  
    
    });
})
app.listen(3000);