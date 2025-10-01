//@jsx: react
//@filename: test.tsx

declare namespace JSX { interface Element { } }
declare var React: any;

declare var Foo, Bar, baz;

<Foo> <Bar> q </Bar> <Bar/>   s <Bar/><Bar/></Foo>;