//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED — DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: internal/checker/types.go
// Regenerate: npx hereby generate:enums
//
export enum SignatureFlags {
    None = 0,
    HasRestParameter = 1 << 0,
    HasLiteralTypes = 1 << 1,
    Construct = 1 << 2,
    Abstract = 1 << 3,
    IsInnerCallChain = 1 << 4,
    IsOuterCallChain = 1 << 5,
    IsUntypedSignatureInJSFile = 1 << 6,
    IsNonInferrable = 1 << 7,
    IsSignatureCandidateForOverloadFailure = 1 << 8,
    PropagatingFlags = HasRestParameter | HasLiteralTypes | Construct | Abstract | IsUntypedSignatureInJSFile | IsSignatureCandidateForOverloadFailure,
    CallChainFlags = IsInnerCallChain | IsOuterCallChain,
}
