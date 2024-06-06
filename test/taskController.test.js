import { expect } from 'chai';
import request from 'supertest';
import { app } from '../src/server.js';

describe('Task API', () => {
  let cookie;

  // simula o login e obtém o cookie da sessão
  before((done) => {
    request(app)
      .post('/auth/login')
      .send({ email: 'bruno@gmail.com', password: '123456' })
      .end((err, res) => {
        if (err) return done(err);
        cookie = res.headers['set-cookie'][0];
        done();
      });
  });

  // testa a adição de uma nova tarefa
  it('should add a new task', (done) => {
    request(app)
      .post('/api/tasks/add')
      .set('Cookie', cookie)
      .send({ title: 'Test Task', description: 'Task for testing', deadline: '2024-12-31', urgency: 'medium' })
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  // testa a conclusão de uma tarefa
  it('should mark a task as complete', (done) => {
    request(app)
      .post(`/api/tasks/complete/1`)
      .set('Cookie', cookie)
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  // testa a exclusão de uma tarefa
  it('should delete a task', (done) => {
    request(app)
      .post(`/api/tasks/delete/1`)
      .set('Cookie', cookie)
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
