module.exports.home_get = (req, res) => {
    res.render('index');
}

module.exports.adminMain_get = (req, res) => {
    res.render('adminPages/admin');
}

module.exports.adminGuide_get = (req, res) => {
    res.render('adminPages/guide');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', "", {maxAge: 1});
    res.redirect("/")
}

