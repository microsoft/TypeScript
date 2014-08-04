/// <reference path='fourslash.ts' />

////some/*undefinedValue*/Variable;
////var a: some/*undefinedType*/Type;
////var x = {}; x.some/*undefinedProperty*/Property;
////var a: any; a.some/*unkownProperty*/Property;

test.markers().forEach((m, i, a) => {
    goTo.position(m.position, m.fileName);
    verify.not.definitionLocationExists();
});
