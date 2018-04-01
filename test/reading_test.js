const assert = require('assert')
const User = require('../src/user')

let joe, alex, maria, zach;
describe('Reading user from the database', () => {

    beforeEach((done) => {
        joe = new User({ name : "Joe" })
        alex = new User({ name : "Alex" })
        maria = new User({ name : "Maria" })
        zach = new User({ name : "Zach" })

        Promise.all([joe.save(), alex.save(), maria.save(), zach.save()])
                .then(() => done());
    })

    it('find all the users with name  as Joe', (done) => {
        User.find({ name : 'Joe'}).then((users) => {
            assert(users[0]._id.toString() === joe._id.toString())
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

      it('fetches users using pagination', (done) => {
        User.find({})
            .sort({name: 1})
            .skip(1)
            .limit(2)
            .then((users) => {
              assert(users.length === 2);
              assert(users[0]._id.toString() === joe._id.toString());
              assert(users[1]._id.toString() === maria._id.toString());
              done();
          });
      });
});