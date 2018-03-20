module.exports = function(app) {
    // 路由页面
    app.get('/', function(req, res) {
        res.redirect('/posts');
    });
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/posts', require('./posts'));
    app.use('/signout', require('./signout'));
    app.use('/comments', require('./comments'));
}