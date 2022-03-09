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
var foo = /** @class */ (function () {
    function foo() {
    }
    return foo;
}());
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
