//// [tests/cases/compiler/complicatedGenericRecursiveBaseClassReference.ts] ////

//// [complicatedGenericRecursiveBaseClassReference.ts]
class S18<B, A, C> extends S18<A[], { S19: A; (): A }[], C[]>
{
}
(new S18(123)).S18 = 0;


//// [complicatedGenericRecursiveBaseClassReference.js]
"use strict";
class S18 extends S18 {
}
(new S18(123)).S18 = 0;
