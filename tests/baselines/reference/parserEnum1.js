//// [parserEnum1.ts]


    export enum SignatureFlags {
        None = 0,
        IsIndexer = 1,
        IsStringIndexer = 1 << 1,
        IsNumberIndexer = 1 << 2,
    }

//// [parserEnum1.js]
(function (SignatureFlags) {
    SignatureFlags[SignatureFlags["None"] = 0] = "None";
    SignatureFlags[SignatureFlags["IsIndexer"] = 1] = "IsIndexer";
    SignatureFlags[SignatureFlags["IsStringIndexer"] = 1 << 1] = "IsStringIndexer";
    SignatureFlags[SignatureFlags["IsNumberIndexer"] = 1 << 2] = "IsNumberIndexer";
})(exports.SignatureFlags || (exports.SignatureFlags = {}));
var SignatureFlags = exports.SignatureFlags;
