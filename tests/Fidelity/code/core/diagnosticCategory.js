///<reference path='references.ts' />
var TypeScript;
(function (TypeScript) {
    (function (DiagnosticCategory) {
        DiagnosticCategory[DiagnosticCategory["Warning"] = 0] = "Warning";
        DiagnosticCategory[DiagnosticCategory["Error"] = 1] = "Error";
        DiagnosticCategory[DiagnosticCategory["Message"] = 2] = "Message";
        DiagnosticCategory[DiagnosticCategory["NoPrefix"] = 3] = "NoPrefix";
    })(TypeScript.DiagnosticCategory || (TypeScript.DiagnosticCategory = {}));
    var DiagnosticCategory = TypeScript.DiagnosticCategory;
})(TypeScript || (TypeScript = {}));
