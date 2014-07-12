enum Colors {
    Red,
    Green
}

var x = Colors.Red; // type of 'x' should be 'Colors'
var p = x.Green; // error
x.toFixed(); // ok

// Now with generics
function fill<B extends Colors>(f: B) {
    f.Green; // error
    f.toFixed(); // ok
}