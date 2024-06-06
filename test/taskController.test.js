// test/taskController.test.js
import { expect } from 'chai';
import request from 'supertest';
import { app } from '../src/server.js';

describe('Task API', () => {
  let cookie;

  // Simula o login e obtém o cookie de sessão
  before((done) => {
    request(app)
      .post('/auth/login')
      .send({ email: 'bruno@gmail.com', password: '123456' }) // Usando credenciais válidas
      .end((err, res) => {
        if (err) return done(err);
        cookie = res.headers['set-cookie'][0]; // Obtendo cookie de sessão
        done();
      });
  });

  // Testa a adição de uma nova tarefa
  it('should add a new task', (done) => {
    request(app)
      .post('/api/tasks/add')
      .set('Cookie', cookie) // Usando cookie de sessão
      .send({ title: 'Test Task', description: 'Task for testing', deadline: '2024-12-31', urgency: 'medium' })
      .expect(302) // Esperando redirecionamento
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  // Testa a conclusão de uma tarefa
  it('should mark a task as complete', (done) => {
    request(app)
      .post(`/api/tasks/complete/1`)
      .set('Cookie', cookie) // Usando cookie de sessão
      .expect(302) // Esperando redirecionamento
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  // Testa a exclusão de uma tarefa
  it('should delete a task', (done) => {
    request(app)
      .post(`/api/tasks/delete/1`)
      .set('Cookie', cookie) // Usando cookie de sessão
      .expect(302) // Esperando redirecionamento
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
