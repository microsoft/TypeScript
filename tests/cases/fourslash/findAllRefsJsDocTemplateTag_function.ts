/// <reference path='fourslash.ts'/>

/////** @template [|{| "isWriteAccess": false, "isDefinition": false |}T|] */
////function f<[|{| "isWriteAccess": true, "isDefinition": true |}T|]>() {}

verify.singleReferenceGroup("(type parameter) T in f<T>(): void");
