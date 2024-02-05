//// [tests/cases/compiler/referenceSatisfiesExpression.ts] ////

//// [referenceSatisfiesExpression.ts]
let a = 10;

// called in checkPrefixUnaryExpression
--(a satisfies number);
++(a satisfies number);

// called in checkPostfixUnaryExpression
(a satisfies number)++;
(a satisfies number)--;

// called in checkAssignmentOperatorWorker
let b: number;
(b satisfies number) = 10;

// called in checkReferenceAssignment called in checkDestructuringAssignment
let c: number;
[(c satisfies number)] = [10];

let d: number, e = 1;
({ d: (e satisfies number) } = { d: 10 });

// called in checkForInStatement
let x: string = "hello"
for ((x satisfies string) in { a: 10 }) {
  console.log(x)
}

// called in checkForOfStatement
let g = 1
for ((g satisfies number) of [10]) {
  console.log(g)
}


//// [referenceSatisfiesExpression.js]
var a = 10;
// called in checkPrefixUnaryExpression
--a;
++a;
// called in checkPostfixUnaryExpression
a++;
a--;
// called in checkAssignmentOperatorWorker
var b;
b = 10;
// called in checkReferenceAssignment called in checkDestructuringAssignment
var c;
c = [10][0];
var d, e = 1;
(e = { d: 10 }.d);
// called in checkForInStatement
var x = "hello";
for (x in { a: 10 }) {
    console.log(x);
}
// called in checkForOfStatement
var g = 1;
for (var _i = 0, _a = [10]; _i < _a.length; _i++) {
    g = _a[_i];
    console.log(g);
}
