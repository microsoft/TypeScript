//// [tests/cases/compiler/commentOnParameter1.ts] ////

//// [commentOnParameter1.ts]
function commentedParameters(
/* Parameter a */
a
/* End of parameter a */
/* Parameter b */
,
b
/* End of parameter b */
){}

//// [commentOnParameter1.js]
function commentedParameters(
/* Parameter a */
a
/* End of parameter a */
/* Parameter b */
, b
/* End of parameter b */
) { }
