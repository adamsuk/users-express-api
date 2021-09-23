var supertest = require("supertest");
var app = require('./app');

const expected_get_res = 'Hello World';

describe('Dummy API Response Test', () => {
  it(`should test reponse is ${expected_get_res}`, () => {
    expect('Hello World').toBe(expected_get_res);
  })
});

describe("Test Eroneous Method Requested", () => {
  it('should test request throws a InvalidMethodError', async() => {
    await supertest(app).delete('/hello-world')
      .expect(400)
      .then((err) => {
        expect({'message': "Requested method 'DELETE' is not supported.",
                'name': 'InvalidMethodError'})
    });
  })
});

describe("Test Actual GET InvalidPathError", () => {
  it('should test request throws a InvalidPathError', async() => {
    await supertest(app).get('/definitely-a-dummy-path')
      .expect(400)
      .then((err) => {
        expect({'message': "Requested path 'definitely-a-dummy-path' not found.",
                'name': 'InvalidPathError'})
    });
  })
});

describe("Test Actual POST InvalidPathError", () => {
  it('should test request throws a InvalidPathError', async() => {
    await supertest(app).post('/definitely-a-dummy-path')
      .expect(400)
      .then((err) => {
        expect({'message': "Requested path 'definitely-a-dummy-path' not found.",
                'name': 'InvalidPathError'})
    });
  })
});
