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
"use strict";
 > ;
//// [2.jsx]
"use strict";
<a: />;
//// [3.jsx]
"use strict";
 < ;
a /  > ;
//// [4.jsx]
"use strict";
<a b d/>;
//// [5.jsx]
"use strict";
<a>;</>;
//// [6.jsx]
"use strict";
<a></b>;
//// [7.jsx]
"use strict";
<a foo="bar;/>;
//// [8.jsx]
"use strict";
<a:b></b>;
//// [9.jsx]
"use strict";
<a:b c></a:b>;
c > ;
//// [10.jsx]
"use strict";
<a.b c></a.b>;
c > ;
//// [11.jsx]
"use strict";
<a.b.c></a>;
//// [12.jsx]
"use strict";
 < .a > ;
a > ;
//// [13.jsx]
"use strict";
<a.></a.>;
//// [14.jsx]
"use strict";
<a />;
[foo] > ;
a[foo] > ;
//// [15.jsx]
"use strict";
<a />;
['foo'] > ;
a['foo'] > ;
//// [16.jsx]
"use strict";
<a><a />;</>;
//// [17.jsx]
"use strict";
<a b=>;</>;
//// [18.jsx]
"use strict";
var x = /* Leading trivia */ (<div>one</div>, <div>two</div>);
;
//// [19.jsx]
"use strict";
var x = (<div>one</div> /* intervening comment */, <div>two</div>);
;
//// [20.jsx]
"use strict";
<a>{"str"};}</a>;
//// [21.jsx]
"use strict";
<span className="a" id="b"/>;
//// [22.jsx]
"use strict";
<div className/>;
"app" > ;
//// [23.jsx]
"use strict";
<div {...props}/>;
//// [24.jsx]
"use strict";
<div>stuff</div>;
{
    props;
}
 > ;
//// [25.jsx]
"use strict";
<div {...props}>stuff</div>;
{
    props;
}
 > ;
//// [26.jsx]
"use strict";
<a>></a>;
//// [27.jsx]
"use strict";
<a> ></a>;
//// [28.jsx]
"use strict";
<a b>;
</>;
//// [29.jsx]
"use strict";
<a b=<>;
</>/>;
//// [30.jsx]
"use strict";
<a>}</a>;
//// [31.jsx]
"use strict";
<a asdf/>;
