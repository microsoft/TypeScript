/// <reference path='fourslash.ts'/>

////function /*1*/foo(/*2*/param: string, /*3*/optionalParam?: string, /*4*/paramWithInitializer = "hello", .../*5*/restParam: string[]) {
////    /*6*/param = "Hello";
////    /*7*/optionalParam = "World";
////    /*8*/paramWithInitializer = "Hello";
////    /*9*/restParam[0] = "World";
////}

goTo.marker("1");
verify.verifyQuickInfoDisplayParts("function", "", { start: test.markerByName('1').position, length: "foo".length },
    [{ text: "(", kind: "punctuation" }, { text: "function", kind: "text" }, { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" }, { text: "foo", kind: "functionName" }, { text: "(", kind: "punctuation" }, 
        { text: "param", kind: "parameterName" }, { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "string", kind: "keyword" },
        { text: ",", kind: "punctuation" }, { text: " ", kind: "space" }, 
        { text: "optionalParam", kind: "parameterName" }, { text: "?", kind: "punctuation" }, { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "string", kind: "keyword" },
        { text: ",", kind: "punctuation" }, { text: " ", kind: "space" },
        { text: "paramWithInitializer", kind: "parameterName" }, { text: "?", kind: "punctuation" }, { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "string", kind: "keyword" },
        { text: ",", kind: "punctuation" }, { text: " ", kind: "space" },
        { text: "...", kind: "punctuation" }, { text: "restParam", kind: "parameterName" }, { text: ":", kind: "punctuation" }, 
        { text: " ", kind: "space" }, { text: "string", kind: "keyword" } , { text: "[", kind: "punctuation" }, { text: "]", kind: "punctuation" },
        { text: ")", kind: "punctuation" }, { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "void", kind: "keyword" }],
    []);

var marker = 1;
function verifyParam(parameterName: string, isRest: boolean) {
    marker++;
    goTo.marker(marker.toString());
    var displayParts = [{ text: "(", kind: "punctuation" }, { text: "parameter", kind: "text" }, { text: ")", kind: "punctuation" }, { text: " ", kind: "space" },
        { text: parameterName, kind: "parameterName" }, { text: ":", kind: "punctuation" }, { text: " ", kind: "space" }, { text: "string", kind: "keyword" }];
    if (isRest) {
        displayParts.push({ text: "[", kind: "punctuation" }, { text: "]", kind: "punctuation" });
    }
    verify.verifyQuickInfoDisplayParts("parameter", "", { start: test.markerByName(marker.toString()).position, length: parameterName.length }, displayParts, []);
}

verifyParam('param', /*isRest*/false);
verifyParam('optionalParam', /*isRest*/false);
verifyParam('paramWithInitializer', /*isRest*/false); 
verifyParam('restParam', /*isRest*/true);

verifyParam('param', /*isRest*/false);
verifyParam('optionalParam', /*isRest*/false);
verifyParam('paramWithInitializer', /*isRest*/false);
verifyParam('restParam', /*isRest*/true);
