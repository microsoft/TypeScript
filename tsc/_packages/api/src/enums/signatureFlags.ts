//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED — DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: internal/checker/types.go
// Regenerate: npx hereby generate:enums
//
export var SignatureFlags: any;
(function (SignatureFlags) {
    SignatureFlags[SignatureFlags["None"] = 0] = "None";
    SignatureFlags[SignatureFlags["HasRestParameter"] = 1] = "HasRestParameter";
    SignatureFlags[SignatureFlags["HasLiteralTypes"] = 2] = "HasLiteralTypes";
    SignatureFlags[SignatureFlags["Construct"] = 4] = "Construct";
    SignatureFlags[SignatureFlags["Abstract"] = 8] = "Abstract";
    SignatureFlags[SignatureFlags["IsInnerCallChain"] = 16] = "IsInnerCallChain";
    SignatureFlags[SignatureFlags["IsOuterCallChain"] = 32] = "IsOuterCallChain";
    SignatureFlags[SignatureFlags["IsUntypedSignatureInJSFile"] = 64] = "IsUntypedSignatureInJSFile";
    SignatureFlags[SignatureFlags["IsNonInferrable"] = 128] = "IsNonInferrable";
    SignatureFlags[SignatureFlags["IsSignatureCandidateForOverloadFailure"] = 256] = "IsSignatureCandidateForOverloadFailure";
    SignatureFlags[SignatureFlags["PropagatingFlags"] = 335] = "PropagatingFlags";
    SignatureFlags[SignatureFlags["CallChainFlags"] = 48] = "CallChainFlags";
})(SignatureFlags || (SignatureFlags = {}));
