const assert = require('assert')
const User = require('../src/user')

describe('Virtual Types', () => {
    it('requires postCount to return number of posts' ,(done) => {
        const joe = new User({ 
            name : 'Joe', posts : [{ title : 'New Post'}]
        })
        
        joe.save()
            .then(() => User.findOne({  name : 'Joe'}))
            .then((user) => {                
                assert(joe.postCount === 1)
                done()
            })

    })
})