/// <reference path='fourslash.ts'/>

////var u = /*undefined*/undefined;
////var n = /*null*/null;
////var a = function() { return /*arguments*/arguments; };
////var t = /*true*/true;
////var f = /*false*/false;

for (const marker of test.markerNames()) {
    verify.goToDefinition(marker, []);
}
