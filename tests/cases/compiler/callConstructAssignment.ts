

var foo:{ ( ):void; }

var bar:{ new ( ):any; }

foo = bar; // error
bar = foo; // error