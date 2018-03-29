const assert = require('assert')
const User = require('../src/user')


describe('Updating records', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({ name : "Joe" })
        joe.save().then(() => {    
            done()
        });
    })

    function assertName(operation, done) {
        operation.then(() => User.find({}))
        .then((users) => {
            assert(users.length === 1)
            assert(users[0].name === 'John')
            done()
            })
        }

    it('instance -> set and save', (done) => {
        joe.set('name', 'John');
        assertName(joe.save(), done)
    });

    it('instance -> update', (done) => { 
        assertName(joe.update({name: 'John'}), done)
    });

    it('class method -> up date all records matching criteria', (done) => { 
        assertName(User.update({ name : 'Joe'} , { name : 'John'}), done)
    });

    it('class method -> up date one record', (done) => { 
        assertName(User.findOneAndUpdate({ name : 'Joe'} , { name : 'John'}), done)
    });

    it('class method -> up date by finding one record', (done) => { 
        assertName(User.findByIdAndUpdate(joe._id , { name : 'John'}), done)
    });
})
