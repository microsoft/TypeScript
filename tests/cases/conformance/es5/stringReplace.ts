// @strict: true

// String.prototype.replace should accept a union of string and RegExp as the first argument
// and a union of string and replace callback as the second argument
"foo".replace(Math.random() >= 0.5 ? "foo" : /foo/, Math.random() >= 0.5 ? "bar" : () => "bar");
