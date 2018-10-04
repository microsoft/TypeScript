/// <reference path='fourslash.ts'/>

////var n: /*number*/number;
////var s: /*string*/string;
////var b: /*boolean*/boolean;
////var v: /*void*/void;

for (const marker of test.markerNames()) {
    verify.goToDefinition(marker, []);
}
