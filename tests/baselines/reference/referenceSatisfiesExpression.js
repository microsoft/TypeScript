//// [tests/cases/compiler/referenceSatisfiesExpression.ts] ////

//// [referenceSatisfiesExpression.ts]
let a = 10;
--(a satisfies number);
++(a satisfies number);

(a satisfies number)++;
(a satisfies number)--;

let b: number;
(b satisfies number) = 10;

let c: number;
[(c satisfies number)] = [10];

let d: number, e = 1;
({ d: (e satisfies number) } = { d: 10 });

let g = 1
for ((g satisfies number) of [10]) {
  console.log(g)
}

let x: string = "hello"
for ((x satisfies string) in { a: 10 }) {
  console.log(x)
}


//// [referenceSatisfiesExpression.js]
var a = 10;
--a;
++a;
a++;
a--;
var b;
b = 10;
var c;
c = [10][0];
var d, e = 1;
(e = { d: 10 }.d);
var g = 1;
for (var _i = 0, _a = [10]; _i < _a.length; _i++) {
    g = _a[_i];
    console.log(g);
}
var x = "hello";
for (x in { a: 10 }) {
    console.log(x);
}
