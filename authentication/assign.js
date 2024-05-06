const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const zod = require("zod");

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

const ans = signJwt("shariqm", "shariq12342");
console.log(ans);