/// <reference path='fourslash.ts'/>

////enum /*1*/E {
////    /*2*/e1,
////    /*3*/e2 = 10,
////    /*4*/e3
////}
////var /*5*/eInstance: /*6*/E;
/////*7*/eInstance = /*8*/E./*9*/e1;
/////*10*/eInstance = /*11*/E./*12*/e2;
/////*13*/eInstance = /*14*/E./*15*/e3;
////const enum /*16*/constE {
////    /*17*/e1,
////    /*18*/e2 = 10,
////    /*19*/e3
////}
////var /*20*/eInstance1: /*21*/constE;
/////*22*/eInstance1 = /*23*/constE./*24*/e1;
/////*25*/eInstance1 = /*26*/constE./*27*/e2;
/////*28*/eInstance1 = /*29*/constE./*30*/e3;

var marker = 0;
function verifyEnumDeclaration(enumName: string, instanceName: string, isConst?: boolean) {
    verifyEnumDisplay();

    verifyEnumMemberDisplay("e1", 0);
    verifyEnumMemberDisplay("e2", 10);
    verifyEnumMemberDisplay("e3", 11);

    verifyInstance();
    verifyEnumDisplay();

    verifyInstance();
    verifyEnumDisplay();
    verifyEnumMemberDisplay("e1", 0);

    verifyInstance();
    verifyEnumDisplay();
    verifyEnumMemberDisplay("e2", 10);

    verifyInstance();
    verifyEnumDisplay();
    verifyEnumMemberDisplay("e3", 11);

    function verifyEnumDisplay() {
        marker++;
        goTo.marker(marker.toString());
        verify.verifyQuickInfoDisplayParts("enum", "", { start: test.markerByName(marker.toString()).position, length: enumName.length },
            (isConst ? [{ text: "const", kind: "keyword" }, { text: " ", kind: "space" }] : []).concat(
                [{ text: "enum", kind: "keyword" }, { text: " ", kind: "space" }, { text: enumName, kind: "enumName" }]),
            []);;
    }

    function verifyEnumMemberDisplay(enumMemberName: string, initializer: number) {
        marker++;
        goTo.marker(marker.toString());
        verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName(marker.toString()).position, length: enumMemberName.length },
            [{ text: "(", kind: "punctuation" }, { text: "enum member", kind: "text" }, { text: ")", kind: "punctuation" },
                { text: " ", kind: "space" }, { text: enumName, kind: "enumName" }, { text: ".", kind: "punctuation" }, { text: enumMemberName, kind: "enumMemberName" }, 
                { text: " ", kind: "space" }, { text: "=", kind: "operator" }, { text: " ", kind: "space" },  { text: initializer.toString(), kind: "numericLiteral" }],
            []);
    }

    function verifyInstance() {
        marker++;
        goTo.marker(marker.toString());
        verify.verifyQuickInfoDisplayParts("var", "", { start: test.markerByName(marker.toString()).position, length: instanceName.length },
            [{ text: "(", kind: "punctuation" }, { text: "var", kind: "text" }, { text: ")", kind: "punctuation" },
                { text: " ", kind: "space" }, { text: instanceName, kind: "localName" }, { text: ":", kind: "punctuation" },
                { text: " ", kind: "space" }, { text: enumName, kind: "enumName" }],
            []);
    }
}

verifyEnumDeclaration("E", "eInstance");
verifyEnumDeclaration("constE", "eInstance1", /*isConst*/ true);
