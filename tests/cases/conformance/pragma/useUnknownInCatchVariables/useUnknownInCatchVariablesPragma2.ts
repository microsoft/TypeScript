// @useUnknownInCatchVariables: true
// @filename: file1.ts
// @ts-useUnknownInCatchVariables
try {

}
catch (thing) {
    thing.a;
}

// @filename: file2.ts
// @ts-useUnknownInCatchVariables true
try {

}
catch (thing) {
    thing.a;
}

// @filename: file3.ts
// @ts-useUnknownInCatchVariables false
try {

}
catch (thing) {
    thing.a;
}

// @filename: file4.ts
try {

}
catch (thing) {
    thing.a;
}
