//// [tests/cases/conformance/esDecorators/metadata/esDecoratorsMetadata5.ts] ////

//// [foo.ts]
declare var metadata: any;
class C {
    @metadata m() {}
}


//// [foo.js]
"use strict";
class C {
    @metadata
    m() { }
}
