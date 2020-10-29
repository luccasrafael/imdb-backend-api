const admin = require('./admin')

module.exports = app => {

    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/movies')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.movie.save))
        .get(app.api.movie.get)

    app.route('/movies/:id/vote')
        .all(app.config.passport.authenticate())
        .post(app.api.movie.vote)

    app.route('/movies/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.movie.getById)

}