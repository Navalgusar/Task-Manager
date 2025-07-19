const isAllow = (...roles) => (req, res, next) => {
    try{
        const {role} = req?.user ?? {};
        if(!role) return res.json({msg: "user role is not found"});

        if(roles.includes(role)) return next();

        return res.json({msg: "route is privet you are not allow"});
    }catch(e) {
        console.log(e)
        return res.json({msg: 'Internal server error !!!'})
    }
}

module.exports = isAllow