const bcrypt = require("bcrypt-nodejs");
const handleRegister = (req, res, db, bcrypt) => {
    const {name, email, password} = req.body
    if (!name || !email || !password){
        return res.status(400).json('incorrect form submission')
    }

    // databases.users.push({
    //     id: '2',
    //     name: name,
    //     email: email,
    //     // password: password,
    //     joined: new Date(),
    //     entries: 0
    // })
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail =>{
                return trx('users')
                    .returning('*')
                    .insert({
                        name: name,
                        email: loginEmail[0].email,
                        joined: new Date()
                    }).then(user => {
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('unable to register'))

    // res.json(databases.users[databases.users.length-1])
}

module.exports = {
    handleRegister
}
