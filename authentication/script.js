const jwt = require("jsonwebtoken");

// decode, verify, generate

const value = {
  name: "harkirat",
  acc: 9248763512
}

// jwt token generation is done by sign 
const token = jwt.sign(value, "secret");
console.log(token);

// This token has been generated using this secret, and this can only be varified by secret 
// anyone can copy this but it can only be varified by our backend