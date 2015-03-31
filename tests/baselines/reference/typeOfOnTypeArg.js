//// [typeOfOnTypeArg.ts]
var A = { '': 3 };

function fill<B extends typeof A>(f: B) {

} 

fill(32);


//// [typeOfOnTypeArg.js]
var A = { '': 3 };
function fill(f) {
}
fill(32);
