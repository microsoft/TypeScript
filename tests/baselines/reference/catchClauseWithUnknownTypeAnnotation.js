//// [catchClauseWithUnknownTypeAnnotation.ts]
try {
} catch (e: unknown) {
}
type UnknownAlias = unknown;
try {
} catch (e: UnknownAlias) {
}


//// [catchClauseWithUnknownTypeAnnotation.js]
try {
}
catch (e) {
}
try {
}
catch (e) {
}
