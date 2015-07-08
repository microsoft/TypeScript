//@jsx: react
//@filename: test.tsx

declare module JSX { interface Element { } }
declare var React: any;

declare var Foo, Bar, baz;

<Foo> <Bar> q </Bar> <Bar/>   s <Bar/><Bar/></Foo>;