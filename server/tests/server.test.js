const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');


beforeEach((done) => {
    Todo.remove({}).then(() => {
        done();
    });
});



describe('POST /todos', () => {

    it('should create a new TODO', (done) => {

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
                Todo.find().then((todos) => {
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((error) => {
                    done(error);
                });
            });
    });

});