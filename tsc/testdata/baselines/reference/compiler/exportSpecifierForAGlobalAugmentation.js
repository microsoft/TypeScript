//// [tests/cases/compiler/exportSpecifierForAGlobalAugmentation.ts] ////

//// [exportSpecifierForAGlobalAugmentation.ts]
declare global {
    var XYZ: number;
}

export { XYZ };


//// [exportSpecifierForAGlobalAugmentation.js]
export { XYZ };
