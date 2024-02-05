//// [tests/cases/compiler/referenceSatisfiesExpression.ts] ////

//// [referenceSatisfiesExpression.ts]
// checkReferenceExpression -> skip OuterExpressionKinds.SatisfiesExpressions

let a = 10;
// checkPrefixUnaryExpression
--(a satisfies number);
++(a satisfies number);

// checkPostfixUnaryExpression
(a satisfies number)++;
(a satisfies number)--;

// checkAssignmentOperatorWorker
let b: number;
(b satisfies number) = 10;

// checkReferenceAssignment
let c: number;
[(c satisfies number)] = [10];

let d: number, e = 1;
({ d: (e satisfies number) } = { d: 10 });

// checkForOfStatement
let g = 1
for ((g satisfies number) of [10]) {
  console.log(g)
}

// checkForInStatement
let x: string = "hello"
for ((x satisfies string) in { a: 10 }) {
  console.log(x)
}


//// [referenceSatisfiesExpression.js]
// checkReferenceExpression -> skip OuterExpressionKinds.SatisfiesExpressions
var a = 10;
// checkPrefixUnaryExpression
--a;
++a;
// checkPostfixUnaryExpression
a++;
a--;
// checkAssignmentOperatorWorker
var b;
b = 10;
// checkReferenceAssignment
var c;
c = [10][0];
var d, e = 1;
(e = { d: 10 }.d);
// checkForOfStatement
var g = 1;
for (var _i = 0, _a = [10]; _i < _a.length; _i++) {
    g = _a[_i];
    console.log(g);
}
// checkForInStatement
var x = "hello";
for (x in { a: 10 }) {
    console.log(x);
}
