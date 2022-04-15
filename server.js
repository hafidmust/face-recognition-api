const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex');
const image = require("./controllers/images");
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profiles = require('./controllers/profiles')

const db = knex({
    client: 'pg',
    connection: {
        connectString: 'postgresql-graceful-46731',
        ssl: true
    }
});


const app = express()
app.use(express.json())
app.use(cors())

//root
app.get('/', ((req, res) => {
    res.send('success')
}))

//signin
app.post('/signin',(req,res) => {
    signin.handleSignin(req, res, db, bcrypt);
})
//register
app.post('/register',(req,res) => {
    register.handleRegister(req,res, db, bcrypt);
})

//profiles
app.get('/profile/:id', (req, res) =>{
    profiles.handleProfileGet(req, res, db);
})


//image
app.put('/image', ((req, res) => {
    image.handleImage(req,res,db)

    // const {id} = req.body;
    // db('users').where('id', '=', id)
    //     .increment('entries', 1)
    //     .returning('entries')
    //     .then(entries => {
    //         res.json(entries[0].entries)
    //     })
    //     .catch(err => res.status(400).json(err))
    // let isAvailable = false;
    // databases.users.forEach(user=>{
    //     if (user.id === id){
    //         isAvailable = true;
    //         user.entries++
    //         return res.json(user.entries)
    //     }
    // })
    // if (!isAvailable){
    //     res.status(404).json(user.entries);
    // }
}))
app.post('/imageurl',(req,res)=>{
    image.handleApiCall(req,res)
})

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.info("server is running on port ", PORT)

})