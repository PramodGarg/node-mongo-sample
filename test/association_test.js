const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../src/user')
const BlogPost = require('../src/blog_post')
const Comment = require('../src/comment')

describe('Association Tests', ()=> {

    let joe, blogPost, comment;
    
    beforeEach((done) => {
        joe = new User({ name : 'Joe'});
        blogPost = new BlogPost({ title : 'Dark Knight', content: 'I am  Batman'});
        comment = new Comment({ content : 'Best superhero ever!!!'});

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;


        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done())
    });


    it('saves a relation b/w user and blog post', (done) => {
        User.findOne( {name : 'Joe'} )
        .populate('blogPosts')
        .then((user) => {
            assert(user.blogPosts[0].title === 'Dark Knight')
            done();
        })
    });

    it('saves a full relation tree b/w user and blog post', (done) => {
        User.findOne( {name : 'Joe'} )
        .populate({
            path: 'blogPosts',
            populate: {
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'user',
                    model: 'user',  
                }
            }
        })
        .then((user) => {
            assert(user.name === 'Joe')
            assert(user.blogPosts[0].title === 'Dark Knight')
            assert(user.blogPosts[0].comments[0].content === 'Best superhero ever!!!')
            done();
        })
    });
});