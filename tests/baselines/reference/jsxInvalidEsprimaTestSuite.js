//// [tests/cases/conformance/jsx/jsxInvalidEsprimaTestSuite.tsx] ////

//// [1.tsx]
declare var React: any;

</>;
//// [2.tsx]
<a: />;
//// [3.tsx]
<:a />;
//// [4.tsx]
<a b=d />;
//// [5.tsx]
<a>;
//// [6.tsx]
<a></b>;
//// [7.tsx]
<a foo="bar;
//// [8.tsx]
<a:b></b>;
//// [9.tsx]
<a:b.c></a:b.c>;
//// [10.tsx]
<a.b:c></a.b:c>;
//// [11.tsx]
<a.b.c></a>;
//// [12.tsx]
<.a></.a>;
//// [13.tsx]
<a.></a.>;
//// [14.tsx]
<a[foo]></a[foo]>;
//// [15.tsx]
<a['foo']></a['foo']>;
//// [16.tsx]
<a><a />;
//// [17.tsx]
<a b={}>;
//// [18.tsx]
var x = /* Leading trivia */ <div>one</div><div>two</div>;;
//// [19.tsx]
var x = <div>one</div> /* intervening comment */ <div>two</div>;;
//// [20.tsx]
<a>{"str";}</a>;
//// [21.tsx]
<span className="a", id="b" />;
//// [22.tsx]
<div className"app">;
//// [23.tsx]
<div {props} />;

//// [24.tsx]
<div>stuff</div {...props}>;

//// [25.tsx]
<div {...props}>stuff</div {...props}>;


//// [26.tsx]
<a>></a>;

//// [27.tsx]
<a> ></a>;

//// [28.tsx]
<a b=}>;

//// [29.tsx]
<a b=<}>;

//// [30.tsx]
<a>}</a>;

//// [31.tsx]
<a .../*hai*/asdf/>;

//// [1.jsx]
 > ;
//// [2.jsx]
<a />;
//// [3.jsx]
 < ;
a /  > ;
//// [4.jsx]
<a b d/>;
//// [5.jsx]
<a>;</>;
//// [6.jsx]
<a></b>;
//// [7.jsx]
<a foo="bar;/>;
//// [8.jsx]
<a b></b>;
//// [9.jsx]
<a b c></a>;
b.c > ;
//// [10.jsx]
<a.b c></a.b>;
c > ;
//// [11.jsx]
<a.b.c></a>;
//// [12.jsx]
 < .a > ;
a > ;
//// [13.jsx]
<a.></a.>;
//// [14.jsx]
<a />;
[foo] > ;
a[foo] > ;
//// [15.jsx]
<a />;
['foo'] > ;
a['foo'] > ;
//// [16.jsx]
<a><a />;</>;
//// [17.jsx]
<a b=>;</>;
//// [18.jsx]
var x = /* Leading trivia */ <div>one</div>, <div>two</div>;
;
//// [19.jsx]
var x = <div>one</div> /* intervening comment */, /* intervening comment */ <div>two</div>;
;
//// [20.jsx]
<a>{"str"};}</a>;
//// [21.jsx]
<span className="a" id="b"/>;
//// [22.jsx]
<div className/>;
"app" > ;
//// [23.jsx]
<div {...props}/>;
//// [24.jsx]
<div>stuff</div>;
{
    props;
}
 > ;
//// [25.jsx]
<div {...props}>stuff</div>;
{
    props;
}
 > ;
//// [26.jsx]
<a>></a>;
//// [27.jsx]
<a> ></a>;
//// [28.jsx]
<a b>;
</>;
//// [29.jsx]
<a b/>, <>;
</>;
//// [30.jsx]
<a>}</a>;
//// [31.jsx]
<a asdf/>;
