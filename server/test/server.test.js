const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Post} = require('./../models/posts');

const posts = [
    {
        _id : new ObjectID(),
        title : 'FirstPost',
        text : 'First text, first.',
        createdAt : 1231231
    },
    {
        _id : new ObjectID(),
        title : 'SecondPost',
        text : 'Second text, Second ',
        createdAt : 1231231
    }
];

var post1 = {
    
    title : 'Third',
    text : 'Third text, Third.',
    createdAt : 342
}

beforeEach((done) => {
    Post.remove({}).then(() => {
      return Post.insertMany(posts);
    }).then(() => done());
});

describe('GET /posts', () => {
    it('should get all posts', (done) => {
      request(app)
        .get('/posts')
        .expect(200)
        .expect((res) => {
          expect(res.body.posts.length).toBe(2);
        })
        .end(done);
    });
  });

  describe('GET /posts/:id', () => {
    it("should return post with id text", (done) => {
      request(app)
        .get(`/posts/${posts[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.post.text).toBe(posts[0].text);
        })
        .end(done);
    });
  
    it('should return 404 of posts with title not found', (done)=>{
        request(app)
            .get('/posts/liorik')
            .expect(404)
            .end(done);
    });

  });

describe('POST /posts', ()=>{
    it('should create new post', (done)=>{
        var postNew = {
            title : "myTitle",
            text : "This is title"
        };
        request(app)
            .post('/createPost')
            .send(postNew)
            .expect(200)
            .expect((res) => {

                expect(res.body.post.text).toBe(postNew.text);
              })
            .end(done);

    });
});
  