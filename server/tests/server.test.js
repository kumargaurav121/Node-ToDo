const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');


var todos = [{
    _id: new ObjectID(),
    text: "hello"
}, {
    _id: new ObjectID(),
    text: "hi"
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done()).catch((e) => done(e));
});



describe('POST /todos', () => {

    it('Should create a new TODO', (done) => {

        var text = 'some new TODO';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                //console.log(res.body);
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((error) => {
                    done(error);
                });
            })
        
    });


    it('should nnot create a TODO with invalid body', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                //console.log(res.body);
                //done();

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((error) => {
                    done(error);
                });
            });
    });

});


describe('GET /todos', (done) => {

    it('Should get Todos', (done) => {

        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);

    });

});



describe('GET /todos/id', (done) => {

    it('should return TODOS item', (done) => {

        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);

    });

    it('should return 404 bad request', (done) => {

        var hexId = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);

    });


    it('should return 400 request', (done) => {

        request(app)
            .get('/todos/123')
            .expect(400)
            .end(done);

    });
});



describe('DELETE /todos', (done) => {

    it('should detele the todo', (done) => {

        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end(done);

    });


    

});






