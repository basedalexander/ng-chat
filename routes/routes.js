var appRouter = function (app) {
    app.get('/fetch', function (req, res) {
        res.send({message: 'woot'});
    })
}

module.exports = appRouter;