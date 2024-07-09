// @strict: true
declare let x: { a?: boolean };

x.a ??= true;
x.a &&= false;
