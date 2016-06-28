/// <reference path='fourslash.ts'/>

////let /*1*/hello: "hello" | 'hello' = "hello";
////let /*2*/world: 'world' = "world";
////let /*3*/helloOrWorld: "hello" | 'world';

goTo.marker("1");
verify.verifyQuickInfoDisplayParts("let", "", { start: test.markerByName('1').position, length: "hello".length }, [
        { text: "let", kind: "keyword" },
        { text: " ", kind: "space" },
        { text: "hello", kind: "localName" },
        { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: '"hello"', kind: "stringLiteral" }, ],
    /*documentation*/ []);

goTo.marker("2");
verify.verifyQuickInfoDisplayParts("let", "", { start: test.markerByName('2').position, length: "world".length }, [
        { text: "let", kind: "keyword" },
        { text: " ", kind: "space" },
        { text: "world", kind: "localName" },
        { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: '"world"', kind: "stringLiteral" },
    ],
    /*documentation*/[]);

goTo.marker("3");
verify.verifyQuickInfoDisplayParts("let", "", { start: test.markerByName('3').position, length: "helloOrWorld".length }, [
        { text: "let", kind: "keyword" },
        { text: " ", kind: "space" },
        { text: "helloOrWorld", kind: "localName" },
        { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: '"hello"', kind: "stringLiteral" },
        { text: " ", kind: "space" },
        { text: "|", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: '"world"', kind: "stringLiteral" },
    ],
    /*documentation*/[]);