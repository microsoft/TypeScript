/// <reference path='fourslash.ts'/>

////var u = /*undefined*/undefined;
////var n = /*null*/null;
////var a = function() { return /*arguments*/arguments; };
////var t = /*true*/true;
////var f = /*false*/false;

test.markers().forEach((m, i, a) => {
    goTo.position(m.position, m.fileName);
    verify.not.definitionLocationExists();
});