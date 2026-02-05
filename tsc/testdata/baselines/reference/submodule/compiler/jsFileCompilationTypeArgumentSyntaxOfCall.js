//// [tests/cases/compiler/jsFileCompilationTypeArgumentSyntaxOfCall.ts] ////

//// [a.jsx]
Foo<number>();
Foo<number>(1);
Foo<number>``;
<Foo<number>></Foo>;
<Foo<number>/>;


//// [a.js]
"use strict";
Foo < number > ();
Foo < number > (1);
Foo < number > ``;
<Foo />, <number>></Foo>;
<Foo />, <number>/>;
</>;
