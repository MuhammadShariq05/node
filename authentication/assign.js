const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const zod = require("zod");

// using zod to verify the inpputs
const emailSchema = zod.string().email();
// password less then 6 wale category me hai
const passwordSchema = zod.string().min(6);


// generate 
function signJwt(username, password){

  const usernameResponse = emailSchema.safeParse(username);
  const passwordResponse = passwordSchema.safeParse(password);

  if(!usernameResponse.success || !passwordResponse){
    return null;
  }

  const signature = jwt.sign({
    username
  }, jwtPassword)
  return signature;
}

// decode
function decodeJwt(token){
  const decode = jwt.decode(token);
  if(decode){
    return true;
  }else{
    return false;
  }
}

// verify
function verifyJwt(token){
  try{
    jwt.verify(token, password);
    return true
  }catch(e){
    console.log("error");
  }
  return false;
}

const ans = signJwt("shariqmello@gmail.com", "shariq12342");
console.log(ans);

const code = decodeJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYXJpcW1lbGxvQGdtYWlsLmNvbSIsImlhdCI6MTcxNTAwOTU4NH0.aiMIKwMhT-ra7IbHMlznifzPYPYQO1ZYEBrDciIt3Fk");
console.log(code);

const ver = verifyJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYXJpcW1lbGxvQGdtYWlsLmNvbSIsImlhdCI6MTcxNTAwOTU4NH0.aiMIKwMhT-ra7IbHMlznifzPYPYQO1ZYEBrDciIt3Fk");
console.log(ver);