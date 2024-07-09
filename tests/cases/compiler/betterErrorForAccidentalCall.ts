declare function foo(): string;

foo()(1 as number).toString();

foo()   (1 as number).toString();

foo()
(1 as number).toString();

foo()
    (1 + 2).toString();

foo()
    (<number>1).toString();
