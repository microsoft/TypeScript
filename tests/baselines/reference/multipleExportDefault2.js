//// [tests/cases/conformance/externalModules/multipleExportDefault2.ts] ////

//// [multipleExportDefault2.ts]
export default {
    uhoh: "another default",
};

export default function Foo() { }



//// [multipleExportDefault2.js]
export default {
    uhoh: "another default",
};
export default function Foo() { }
