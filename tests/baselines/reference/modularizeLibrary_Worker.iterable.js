//// [tests/cases/compiler/modularizeLibrary_Worker.iterable.ts] ////

//// [modularizeLibrary_Worker.iterable.ts]
for (const [key, entry] of new FormData()) {
    entry;
}


//// [modularizeLibrary_Worker.iterable.js]
for (const [key, entry] of new FormData()) {
    entry;
}
