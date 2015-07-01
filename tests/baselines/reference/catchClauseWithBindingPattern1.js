//// [catchClauseWithBindingPattern1.ts]
try {
}
catch ({a}) {
}

//// [catchClauseWithBindingPattern1.js]
try {
}
catch (a = (void 0).a) {
}
