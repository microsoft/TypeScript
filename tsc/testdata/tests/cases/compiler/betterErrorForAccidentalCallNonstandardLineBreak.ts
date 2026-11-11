// @target: es2015

// Repro from #65433 with U+2028 (Line Separator)
const a = (x: number) => x (1);

// With U+2029 (Paragraph Separator)
const b = (x: number) => x (1);

declare function foo(): string;

foo() (1 as number).toString();

foo() (1 as number).toString();

foo()    (1 + 2).toString();

foo() // comment (1 as number).toString();
