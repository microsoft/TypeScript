//// [jsxNamespacePrefixInName.tsx]
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


//// [jsxNamespacePrefixInName.jsx]
var justElement1 = <a:element />;
var justElement2 = <a:element></a:element>;
var justElement3 = <a:element attr={"value"}></a:element>;
var justElement4 = <a:element>{"text"}</a:element>;
var justElement5 = <a:element attr={"value"}>{"text"}</a:element>;
var tooManySeparators1 = <a:ele ment/>;
var tooManySeparators2 = <a:ele ment></a:ele>, ment;
 > ;
var tooManySeparators3 = <a:ele ment attr={"value"}></a:ele>, ment;
 > ;
var tooManySeparators4 = <a:ele ment>{"text"}</a:ele>, ment;
 > ;
var tooManySeparators5 = <a:ele ment attr={"value"}>{"text"}</a:ele>, ment;
 > ;
var justAttribute1 = <element a:attr={"value"}/>;
var justAttribute2 = <element a:attr={"value"}></element>;
var justAttribute3 = <element a:attr={"value"}>{"text"}</element>;
var both1 = <a:element a:attr={"value"}/>;
var both2 = <a:element k:attr={"value"}></a:element>;
var both3 = <a:element a:attr={"value"}>{"text"}</a:element>;
var endOfIdent1 = <a attr={"value"}/>;
var endOfIdent2 = <a attr {..."value"}/>;
var beginOfIdent1 =  < , a, attr = { "value":  } /  > ;
var beginOfIdent2 = <a attr={"value"}/>;
var upcaseComponent1 = <ns:Upcase />; // Parsed as intrinsic
var upcaseComponent2 = <Upcase:element />; // Parsed as instrinsic
