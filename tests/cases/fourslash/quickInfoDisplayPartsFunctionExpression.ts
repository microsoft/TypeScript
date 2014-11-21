/// <reference path='fourslash.ts'/>

////var /*1*/x = function /*2*/foo() {
////    /*3*/foo();
////};
////var /*4*/y = function () {
////};
////(function /*5*/foo1() {
////    /*6*/foo1();
////})();

var marker = 0;
function verifyInstance(instanceName: string) {
    marker++;
    goTo.marker(marker.toString());
    verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName(marker.toString()).position, length: instanceName.length },
        [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: instanceName, kind: "localName" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: "(", kind: "punctuation" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: "=>", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "void", kind: "keyword" }],
        []);
}

function verifyNamedFunctionExpression(functionName: string) {
    marker++;
    goTo.marker(marker.toString());
    verify.verifyQuickInfoDisplayParts("local function", "", { start: test.markerByName(marker.toString()).position, length: functionName.length },
        [{ text: "(", kind: "punctuation" }, { text: "local function", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: functionName, kind: "functionName" }, { text: "(", kind: "punctuation" },
            { text: ")", kind: "punctuation" }, { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "void", kind: "keyword" }],
        []);
}

verifyInstance("x");
// Declaration
verifyNamedFunctionExpression("foo");
// Call
verifyNamedFunctionExpression("foo");

verifyInstance("y");

// Declaration
verifyNamedFunctionExpression("foo1");
// Call
verifyNamedFunctionExpression("foo1");
