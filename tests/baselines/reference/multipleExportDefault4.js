//// [tests/cases/conformance/externalModules/multipleExportDefault4.ts] ////

//// [multipleExportDefault4.ts]
export default class C { }

export default {
    uhoh: "another default",
};

//// [multipleExportDefault4.js]
export default class C {
}
export default {
    uhoh: "another default",
};
