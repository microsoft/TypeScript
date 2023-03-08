/// <reference path="./fourslash.ts"/>

////const STRINGS = {
////    [|/*definition*/title|]: 'A Title',
////} satisfies Record<string,string>;
////
//////somewhere in app
////STRINGS.[|/*usage*/title|]

verify.goToDefinition("definition", "definition");
verify.goToDefinition("usage", "definition");
