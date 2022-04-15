const handleProfileGet = ((req, res, db) => {
    const {id} = req.params;

    db.select('*').from('users').where({id})
        .then(user => {
            if (res.length) {
                res.json(user[0])
            } else {
                res.status(404).json('user not found')
            }
        })
        .catch(err => {
            res.status(400).json('error getting user')
        })
    // let isAvailable = false;

    // databases.users.forEach(user=>{
    //     if (user.id === id){
    //         res.json(user)
    //         isAvailable = true;
    //     }
    // })
    // if (!isAvailable){
    //     res.status(404).json('user not found');
    // }
})

module.exports = {
    handleProfileGet
}