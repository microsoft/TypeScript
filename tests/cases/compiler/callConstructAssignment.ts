// @target: es2015


declare var foo:{ ( ):void; }

declare var bar:{ new ( ):any; }

foo = bar; // error
bar = foo; // error