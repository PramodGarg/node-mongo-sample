const mongoose = require('mongoose')
mongoose.Promise = global.Promise

before((done) => {

    mongoose.connect("mongodb://localhost/users_test");
    mongoose.connection
    .once('open', () => {
    console.log('Mongo Connected');
    done()
    })
    .on('error', ()=>{
        console.warn('Warning', error);
    });
});

beforeEach((done) => {

    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});