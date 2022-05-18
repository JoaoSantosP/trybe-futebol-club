import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response, ResponseError } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing login route', () => {
  describe('In case of login datas correct', () => {
    let chaiHttpResponse: Response;
    it('Return status code 200', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
           email: 'admin@admin.com',
           password: 'secret_admin',
         });
  
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.have.a.property("token")
    });
  })
 describe('In case of login datas incorrect',  () => {
   let chaiHttpResponse1: Response;
   it('Return status 401 in case of email incorrect', async () => {
    chaiHttpResponse1 = await chai.request(app).post('/login').send({
      email: 'sdfaefsg',
      password: 'secret_admin',
    })

    expect(chaiHttpResponse1.status).to.equal(401);
    expect(chaiHttpResponse1.body).not.to.have.property("token");
   })
   it ('Return status 401 and error message in case of password incorrect', async () => {
     let chaiHttpResponse2: Response;
    chaiHttpResponse2 = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'no_secret',
    })
    const { message } = chaiHttpResponse1.body;
    expect(chaiHttpResponse1.status).to.be.equal(401)
    expect(message).to.be.equal("Incorrect email or password");
   })
 })
});

describe('Testing match route', () => {
  describe('In case of sucess', () => {
    let chaiHttpResponse: Response;
    it('Return status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/matchs')
      expect(chaiHttpResponse.status).to.be.equal(200);
    })
  })
})

describe('Testing clubs route', () => {
  describe('In case of sucess', () => {
    let chaiHttpResponse: Response;
    it('Return status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs')
      expect(chaiHttpResponse.status).to.be.equal(200);
    })
  })
  describe('Find club with id', () => {
    let chaiHttpResponse: Response;
    it('Return status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs/:id').send({
        id: 5
      })
      expect(chaiHttpResponse.status).to.be.equal(200);
    })
  })
})