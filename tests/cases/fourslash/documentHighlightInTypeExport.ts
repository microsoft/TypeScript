/// <reference path='fourslash.ts'/>

// @Filename: /1.ts
//// type [|A|] = 1;
//// export { [|A|] as [|B|] };


// @Filename: /2.ts
//// type [|A|] = 1;
//// let [|A|]: [|A|] = 1;
//// export { [|A|] as [|B|] };

// a little strange, but the the type/value namespaces work too

// @Filename: /3.ts
//// type [|A|] = 1;
//// let [|A|]: [|A|] = 1;
//// export type { [|A|] as [|B|] };

// type-only exports may still export values to be imported and used in type contexts

// would be nice if this could work the same for imports too, but getSymbolAtLocation()
// of the imported symbol (when aliased) returns undefined

// // @Filename: /4.ts
// //// import type { [|Tee|] as [|T|] } from "whatEveh";
// //// let [|T|]: [|T|];
//

verify.baselineDocumentHighlights();