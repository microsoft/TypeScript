/// <reference path='fourslash.ts' />

////interface I<[|{| "isWriteAccess": true, "isDefinition": true |}T|]> { a: [|T|] }
////interface I<[|{| "isWriteAccess": true, "isDefinition": true |}T|]> { b: [|T|] }

verify.singleReferenceGroup("(type parameter) T in I<T>");
