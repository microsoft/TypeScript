//// [tests/cases/compiler/jsxNamespacePrefixInNameReact.tsx] ////

//// [jsxNamespacePrefixInNameReact.tsx]
declare var React: any;

var justElement1 = <a:element />;
var justElement2 = <a:element></a:element>;
var justElement3 = <a:element attr={"value"}></a:element>;
var justElement4 = <a:element>{"text"}</a:element>;
var justElement5 = <a:element attr={"value"}>{"text"}</a:element>;

var tooManySeparators1 = <a:ele:ment />;
var tooManySeparators2 = <a:ele:ment></a:ele:ment>;
var tooManySeparators3 = <a:ele:ment attr={"value"}></a:ele:ment>;
var tooManySeparators4 = <a:ele:ment>{"text"}</a:ele:ment>;
var tooManySeparators5 = <a:ele:ment attr={"value"}>{"text"}</a:ele:ment>;

var justAttribute1 = <element a:attr={"value"} />;
var justAttribute2 = <element a:attr={"value"}></element>;
var justAttribute3 = <element a:attr={"value"}>{"text"}</element>;

var both1 = <a:element a:attr={"value"} />;
var both2 = <a:element k:attr={"value"}></a:element>;
var both3 = <a:element a:attr={"value"}>{"text"}</a:element>;

var endOfIdent1 = <a: attr={"value"} />;
var endOfIdent2 = <a attr:={"value"} />;

var beginOfIdent1 = <:a attr={"value"} />;
var beginOfIdent2 = <a :attr={"value"} />;

var upcaseComponent1 = <ns:Upcase />;  // Parsed as intrinsic
var upcaseComponent2 = <Upcase:element />;  // Parsed as instrinsic


//// [jsxNamespacePrefixInNameReact.js]
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var justElement1 = React.createElement("a:element", null);
var justElement2 = React.createElement("a:element", null);
var justElement3 = React.createElement("a:element", { attr: "value" });
var justElement4 = React.createElement("a:element", null, "text");
var justElement5 = React.createElement("a:element", { attr: "value" }, "text");
var tooManySeparators1 = React.createElement("a:ele", { ment: true });
var tooManySeparators2 = React.createElement("a:ele", { ment: true }), ment;
 > ;
var tooManySeparators3 = React.createElement("a:ele", { ment: true, attr: "value" }), ment;
 > ;
var tooManySeparators4 = React.createElement("a:ele", { ment: true }, "text"), ment;
 > ;
var tooManySeparators5 = React.createElement("a:ele", { ment: true, attr: "value" }, "text"), ment;
 > ;
var justAttribute1 = React.createElement("element", { "a:attr": "value" });
var justAttribute2 = React.createElement("element", { "a:attr": "value" });
var justAttribute3 = React.createElement("element", { "a:attr": "value" }, "text");
var both1 = React.createElement("a:element", { "a:attr": "value" });
var both2 = React.createElement("a:element", { "k:attr": "value" });
var both3 = React.createElement("a:element", { "a:attr": "value" }, "text");
var endOfIdent1 = React.createElement("a:attr", __assign({}, "value"));
var endOfIdent2 = React.createElement("a", { "attr:": "value" });
var beginOfIdent1 =  < , a, attr = { "value":  } /  > ;
var beginOfIdent2 = React.createElement("a:attr", __assign({}, "value"));
var upcaseComponent1 = React.createElement("ns:Upcase", null); // Parsed as intrinsic
var upcaseComponent2 = React.createElement("Upcase:element", null); // Parsed as instrinsic
