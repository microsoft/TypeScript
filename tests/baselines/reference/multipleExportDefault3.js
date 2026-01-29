//// [tests/cases/conformance/externalModules/multipleExportDefault3.ts] ////

//// [multipleExportDefault3.ts]
export default {
    uhoh: "another default",
};

export default class C { }



//// [multipleExportDefault3.js]
export default {
    uhoh: "another default",
};
export default class C {
}
