module.exports.home_get = (req, res) => {
    res.render('index');
}

module.exports.form_get = (req, res) => {
    res.render('form');
}

module.exports.om_get = (req, res) => {
    res.render('om');
}

module.exports.adminMain_get = (req, res) => {
    res.render('adminPages/admin');
}

module.exports.adminForm_get = (req, res) => {
    res.render('adminPages/adminForm');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.create_get = (req, res) => {
    res.render('create');
}

module.exports.reset_get = (req, res) => {
    res.render('reset');
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', "", {maxAge: 1});
    res.redirect("/")
}

