//// [tests/cases/conformance/types/typeParameters/typeParameterLists/varianceAnnotationsWithCircularlyReferencesError.ts] ////

//// [varianceAnnotationsWithCircularlyReferencesError.ts]
type T1<in in> = T1 // Error: circularly references 
type T2<out out> = T2 // Error: circularly references 

//// [varianceAnnotationsWithCircularlyReferencesError.js]
"use strict";


//// [varianceAnnotationsWithCircularlyReferencesError.d.ts]
type T1<in , > = T1;
type T2<out out> = T2;
