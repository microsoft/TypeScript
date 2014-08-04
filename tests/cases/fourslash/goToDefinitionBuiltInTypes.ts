/// <reference path='fourslash.ts'/>

////var n: /*number*/number;
////var s: /*string*/string;
////var b: /*boolean*/boolean;
////var v: /*void*/void;

test.markers().forEach((m, i, a) => {
    goTo.position(m.position, m.fileName);
    verify.not.definitionLocationExists();
});