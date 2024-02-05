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
