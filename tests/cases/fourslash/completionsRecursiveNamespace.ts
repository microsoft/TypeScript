/// <reference path='fourslash.ts'/>

////declare namespace N {
////    export import M = N;
////}
////type T = N./**/

// Previously this would crash in `symbolCanBeReferencedAtTypeLocation` due to the namespace exporting itself.
verify.completions({ marker: "", exact: undefined });
