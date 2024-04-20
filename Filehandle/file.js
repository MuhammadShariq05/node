const fs = require("fs");

// Sync
fs.writeFile(
  "./text.txt",
  "Created a text file using fs module",
  function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been written successfully.");
  }
);

// Async..

fs.writeFileSync(
  "./textAsync.txt",
  "making file through async method..",
  function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("File created Successfully..");
    }
  }
);


// synchronous
const result = fs.readFileSync("./textAsync.txt", "utf-8");
console.log(result);

// Reading file asynchronously and not returning any value, void
fs.readFile("./text.txt", "utf-8", (err, res) => {
  if(err){
    console.log("Error detected", err);
  } else{
    console.log(res);
  }
});


// To update in the existing file..
// Sync
fs.appendFileSync("./text.txt", `${Date.now()} Hey there`);

// Async