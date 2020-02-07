//// [a.jsx]
Foo<number>();
Foo<number>(1);
Foo<number>``;
<Foo<number>></Foo>;
<Foo<number>/>;


//// [a.js]
Foo < number > ();
Foo < number > (1);
Foo < number > "";
<Foo />, <number>></Foo>;
<Foo />, <number>/>;
</>;
