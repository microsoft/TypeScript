/// <reference path='fourslash.ts'/>

////var /*1*/x = /*5*/a => 10;
////var /*2*/y = (/*6*/a, /*7*/b) => 10;
////var /*3*/z = (/*8*/a: number) => 10;
////var /*4*/z2 = () => 10;

var marker = 0;
function verifyInstance(instanceName: string, paramCount: number, type: string) {
    marker++;
    goTo.marker(marker.toString());
    var displayParts = [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: instanceName, kind: "localName" }, { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "(", kind: "punctuation" }];
    
    for (var i = 0; i < paramCount; i++) {
        if (i) {
            displayParts.push({ text: ",", kind: "punctuation" }, { text: " ", kind: "space" });
        }
        displayParts.push({ text: i ? "a" : "b", kind: "parameterName" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: type, kind: "keyword" });
    }
    displayParts.push({ text: ")", kind: "punctuation" }, { text: " ", kind: "space" },
        { text: "=>", kind: "punctuation" }, { text: " ", kind: "space" },
        { text: "number", kind: "keyword" });


    verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName(marker.toString()).position, length: instanceName.length },
        displayParts, []);
}

function verifyParameter(parameterName: string, type: string) {
    marker++;
    goTo.marker(marker.toString());
    verify.verifyQuickInfoDisplayParts("parameter", "", { start: test.markerByName(marker.toString()).position, length: parameterName.length },
        [{ text: "(", kind: "punctuation" }, { text: "parameter", kind: "text" }, { text: ")", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: parameterName, kind: "parameterName" }, { text: ":", kind: "punctuation" },
            { text: " ", kind: "space" }, { text: type, kind: "keyword" }],
        []);
}

verifyInstance("x", 1, "any");
verifyInstance("y", 2, "any");
verifyInstance("z", 1, "number");
verifyInstance("z2", 0, "any");

verifyParameter("a", "any");
verifyParameter("a", "any");
verifyParameter("b", "any");
verifyParameter("a", "number");
