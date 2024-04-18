function add(a,b){
  return a+b;
}

// now we want to add another fucnction and export karna hai
function sub(a,b){
  return a-b;
}

// we have to use this module.exports to export the value of this page to another page where its called, like module.js me we have wrote require , which implies math.js is called there

// we can use javascript object to import the multiple function.. its default export
module.exports = {
  add,
  sub,
}

