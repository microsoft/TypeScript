// @jsx: preserve
// @filename: 1.tsx
declare var React: any;

</>;
// @filename: 2.tsx
<a: />;
// @filename: 3.tsx
<:a />;
// @filename: 4.tsx
<a b=d />;
// @filename: 5.tsx
<a>;
// @filename: 6.tsx
<a></b>;
// @filename: 7.tsx
<a foo="bar;
// @filename: 8.tsx
<a:b></b>;
// @filename: 9.tsx
<a:b.c></a:b.c>;
// @filename: 10.tsx
<a.b:c></a.b:c>;
// @filename: 11.tsx
<a.b.c></a>;
// @filename: 12.tsx
<.a></.a>;
// @filename: 13.tsx
<a.></a.>;
// @filename: 14.tsx
<a[foo]></a[foo]>;
// @filename: 15.tsx
<a['foo']></a['foo']>;
// @filename: 16.tsx
<a><a />;
// @filename: 17.tsx
<a b={}>;
// @filename: 18.tsx
var x = /* Leading trivia */ <div>one</div><div>two</div>;;
// @filename: 19.tsx
var x = <div>one</div> /* intervening comment */ <div>two</div>;;
// @filename: 20.tsx
<a>{"str";}</a>;
// @filename: 21.tsx
<span className="a", id="b" />;
// @filename: 22.tsx
<div className"app">;
// @filename: 23.tsx
<div {props} />;

// @filename: 24.tsx
<div>stuff</div {...props}>;

// @filename: 25.tsx
<div {...props}>stuff</div {...props}>;


// @filename: 26.tsx
<a>></a>;

// @filename: 27.tsx
<a> ></a>;

// @filename: 28.tsx
<a b=}>;

// @filename: 29.tsx
<a b=<}>;

// @filename: 30.tsx
<a>}</a>;

// @filename: 31.tsx
<a .../*hai*/asdf/>;