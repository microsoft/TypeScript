/// <reference path="./fourslash.ts"/>

// @noImplicitOverride: true

////const STRINGS = {
////    [|/*definition*/title|]: 'A Title',
////} satisfies Record<string,string>;
////
//////somewhere in app
////STRINGS.[|/*usage*/title|]

// verify.goToDefinition("usage", "definition");
verify.goToDefinition("definition", "definition");
verify.goToDefinition("usage", "definition");
