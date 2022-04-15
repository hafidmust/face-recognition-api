const bcrypt = require("bcrypt-nodejs");
const handleSignin = ((req, res, db, bcrypt) => {
    const { email, password} = req.body
    if (!email || !password){
        return res.status(400).json('incorrect form submission')
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data =>{
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid){
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user =>{
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json(err))
            }else{
                res.status(400).json('wrong credentials')
            }

        })
        .catch(err => res.status(400).json('wrong credentials'))
    // bcrypt.compare("123", "$2a$10$l/DRbP13lZDIpToiSio1m.yOgd56dInB4WSRFnEEX48YnbdjcKFRy", function (err, res) {
    //     // res == true
    //     console.log('first guess', res)
    // });
    // bcrypt.compare("veggies", "$2a$10$l/DRbP13lZDIpToiSio1m.yOgd56dInB4WSRFnEEX48YnbdjcKFRy", function (err, res) {
    //     // res = false
    //     console.log('second guess', res)
    // });
    // if (req.body.email === databases.users[0].email && req.body.password === databases.users[0].password) {
    //     res.json("success")
    // } else {
    //     res.json("error")
    // }
})

module.exports = {handleSignin};
