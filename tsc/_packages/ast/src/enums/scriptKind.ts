export var ScriptKind: any;
(function (ScriptKind) {
    ScriptKind[ScriptKind["Unknown"] = 0] = "Unknown";
    ScriptKind[ScriptKind["JS"] = 1] = "JS";
    ScriptKind[ScriptKind["JSX"] = 2] = "JSX";
    ScriptKind[ScriptKind["TS"] = 3] = "TS";
    ScriptKind[ScriptKind["TSX"] = 4] = "TSX";
    ScriptKind[ScriptKind["External"] = 5] = "External";
    ScriptKind[ScriptKind["JSON"] = 6] = "JSON";
    ScriptKind[ScriptKind["Deferred"] = 7] = "Deferred";
})(ScriptKind || (ScriptKind = {}));
