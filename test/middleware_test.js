const mongoose = require('mongoose');
const assert = require('assert')

const User = require('../src/user');
const BlogPost = require('../src/blog_post');


describe('Middleware Tests', ()=> {

    let joe, blogPost,blogPost2;
    
    beforeEach((done) => {
        joe = new User({ name : 'Joe'});
        blogPost = new BlogPost({ title : 'Dark Knight', content: 'I am  Batman'});
        blogPost2 = new BlogPost({ title : 'Dark Knight1', content: 'I am  Batman1'});

        joe.blogPosts.push(blogPost);
        joe.blogPosts.push(blogPost2);

        Promise.all([joe.save(), blogPost.save(),blogPost2.save()])
            .then(() => done())
    });

    it('remove up user and its respective blogPost', (done) => {
        joe.remove()
             .then( () => BlogPost.find())
            .then((blogPost) => {
                assert(blogPost.length === 0)
                done()
            });
        
    });

});