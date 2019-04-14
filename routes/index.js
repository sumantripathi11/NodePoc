module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `member` ORDER BY 1";

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to POC Dashboard"
                , members: result
            });
        });
    },
};