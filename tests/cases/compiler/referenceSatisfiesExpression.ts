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
