//// [parser512097.ts]
var tt = { aa; } // After this point, no useful parsing occurs in the entire file

if (true) {
}

//// [parser512097.js]
var tt = { aa:  }; // After this point, no useful parsing occurs in the entire file
if (true) {
}
