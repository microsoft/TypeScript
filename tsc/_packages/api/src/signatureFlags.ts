export var SignatureFlags: any;
(function (SignatureFlags) {
    SignatureFlags[SignatureFlags["None"] = 0] = "None";
    SignatureFlags[SignatureFlags["HasRestParameter"] = 1] = "HasRestParameter";
    SignatureFlags[SignatureFlags["HasLiteralTypes"] = 2] = "HasLiteralTypes";
    SignatureFlags[SignatureFlags["Construct"] = 4] = "Construct";
    SignatureFlags[SignatureFlags["Abstract"] = 8] = "Abstract";
})(SignatureFlags || (SignatureFlags = {}));
