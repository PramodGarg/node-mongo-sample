const assert = require('assert')
const User = require('../src/user')

let joe;
describe('Reading user from the database', () => {

    beforeEach((done) => {
        joe = new User({ name : "Joe" })
        joe.save().then(() => {    
            done()
        });
    })

    it('find all the users with name  as Joe', (done) => {
        User.find({ name : 'Joe'}).then((users) => {
            assert(users[0]._id.toString() == joe._id.toString())
            done()
        })
    })

    it('finds particular user with _id', (done) => {
        User.findOne({ _id: joe._id })
          .then((user) => {
            assert(user._id.toString() === joe._id.toString());
            done();
          });
      });
});