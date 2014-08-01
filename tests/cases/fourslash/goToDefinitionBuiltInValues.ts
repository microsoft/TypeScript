/// <reference path='fourslash.ts'/>

////var u = /*undefined*/undefined;
////var n = /*null*/null;
////var a = function() { return /*arguments*/arguments; };

test.markers().forEach((m, i, a) => {
    goTo.position(m.position, m.fileName);
    verify.not.definitionLocationExists();
});