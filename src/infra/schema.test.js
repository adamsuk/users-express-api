var schema = require("./schema");

const postCreateDataToValidate = { 
  username: "hi_there",
  password: "whooopwhooop",
  email: "testing@123.com"
}

const postDeleteDataToValidate = { 
  username: "hi_there",
}

describe('Validate create POST Schema Inputs', () => {
  it(`should test reponse is ${postCreateDataToValidate}`, () => {
    var result = schema.POST_create.validate(postCreateDataToValidate)
    expect(result).toEqual({value: postCreateDataToValidate});
    expect(result.error).toBeUndefined();
  })
});

describe('Validate delete POST Schema Inputs', () => {
  it(`should test reponse is ${postDeleteDataToValidate}`, () => {
    var result = schema.POST_delete.validate(postDeleteDataToValidate)
    expect(result).toEqual({value: postDeleteDataToValidate});
    expect(result.error).toBeUndefined();
  })
});
