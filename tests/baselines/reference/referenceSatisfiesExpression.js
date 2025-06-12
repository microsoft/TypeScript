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
let a = 10;
--a;
++a;
a++;
a--;
let b;
b = 10;
let c;
[c] = [10];
let d, e = 1;
({ d: e } = { d: 10 });
let g = 1;
for (g of [10]) {
    console.log(g);
}
let x = "hello";
for (x in { a: 10 }) {
    console.log(x);
}
