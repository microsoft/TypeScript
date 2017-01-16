/// <reference path='fourslash.ts' />

////some/*undefinedValue*/Variable;
////var a: some/*undefinedType*/Type;
////var x = {}; x.some/*undefinedProperty*/Property;
////var a: any; a.some/*unkownProperty*/Property;

for (const marker of test.markerNames()) {
    verify.goToDefinition(marker, []);
}
