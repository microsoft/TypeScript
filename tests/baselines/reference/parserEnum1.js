//// [parserEnum1.ts]


    export enum SignatureFlags {
        None = 0,
        IsIndexer = 1,
        IsStringIndexer = 1 << 1,
        IsNumberIndexer = 1 << 2,
    }

//// [parserEnum1.js]
"use strict";
var SignatureFlags;
(function (SignatureFlags) {
    SignatureFlags[SignatureFlags["None"] = 0] = "None";
    SignatureFlags[SignatureFlags["IsIndexer"] = 1] = "IsIndexer";
    SignatureFlags[SignatureFlags["IsStringIndexer"] = 2] = "IsStringIndexer";
    SignatureFlags[SignatureFlags["IsNumberIndexer"] = 4] = "IsNumberIndexer";
})(SignatureFlags = exports.SignatureFlags || (exports.SignatureFlags = {}));
