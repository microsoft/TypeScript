var A = { '': 3 };

function fill<B extends typeof A>(f: B) {

} 

fill(32);
