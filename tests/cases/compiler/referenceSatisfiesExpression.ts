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
