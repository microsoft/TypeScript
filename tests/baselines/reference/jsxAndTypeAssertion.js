//// [tests/cases/conformance/jsx/jsxAndTypeAssertion.tsx] ////

//// [jsxAndTypeAssertion.tsx]
declare var createElement: any;

class foo {}

var x: any;
x = <any> { test: <any></any> };

x = <any><any></any>;
 
x = <foo>hello {<foo>{}} </foo>;

x = <foo test={<foo>{}}>hello</foo>;

x = <foo test={<foo>{}}>hello{<foo>{}}</foo>;

x = <foo>x</foo>, x = <foo/>;

<foo>{<foo><foo>{/foo/.test(x) ? <foo><foo></foo> : <foo><foo></foo>}</foo>}</foo>

    


//// [jsxAndTypeAssertion.jsx]
"use strict";
class foo {
}
var x;
x = <any> {test}: <any></any> };

x = <any><any></any>;
 
x = <foo>hello {<foo>} </foo>};

x = <foo test={<foo>}>hello</foo>}/>;

x = <foo test={<foo>}>hello{<foo>}</foo>};

x = <foo>x</foo>, x = <foo />;

    <foo>{<foo><foo>{/foo/.test(x) ? <foo><foo></foo> : <foo><foo></foo>}</foo>}</foo>
            :
        }

    
        </></>}</></>}/></></></>;
