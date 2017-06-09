/// <reference path='fourslash.ts'/>

/////** @template [|T|] */
////class C<[|{| "isWriteAccess": true, "isDefinition": true |}T|]> {}

verify.singleReferenceGroup("(type parameter) T in C<T>");
