// @strict: true

function f1<T>(o: T) {
  o.toString(); // error
}

function f2<T extends {}>(o: T) {
  o.toString(); // no error
}

function f3<T extends Record<string, any>>(o: T) {
  o.toString(); // no error
}

function user<T>(t: T) {
  f1(t);
  f2(t); // error in strict, unbounded T doesn't satisfy the constraint
  f3(t); // error in strict, unbounded T doesn't satisfy the constraint
  t.toString();  // error, for the same reason as f1()
}
