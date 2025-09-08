//// [tests/cases/conformance/externalModules/multipleExportDefault1.ts] ////

//// [multipleExportDefault1.ts]
export default function Foo (){
    
}

export default {
    uhoh: "another default",
};


//// [multipleExportDefault1.js]
export default function Foo() {
}
export default {
    uhoh: "another default",
};
