var ts;
(function (ts) {
    // Return code used by getEmitOutput function to indicate status of the function
    (function (EmitReturnStatus) {
        EmitReturnStatus[EmitReturnStatus["Succeeded"] = 0] = "Succeeded";
        EmitReturnStatus[EmitReturnStatus["AllOutputGenerationSkipped"] = 1] = "AllOutputGenerationSkipped";
        EmitReturnStatus[EmitReturnStatus["JSGeneratedWithSemanticErrors"] = 2] = "JSGeneratedWithSemanticErrors";
        EmitReturnStatus[EmitReturnStatus["DeclarationGenerationSkipped"] = 3] = "DeclarationGenerationSkipped";
        EmitReturnStatus[EmitReturnStatus["EmitErrorsEncountered"] = 4] = "EmitErrorsEncountered";
        EmitReturnStatus[EmitReturnStatus["CompilerOptionsErrors"] = 5] = "CompilerOptionsErrors";
    })(ts.EmitReturnStatus || (ts.EmitReturnStatus = {}));
    var EmitReturnStatus = ts.EmitReturnStatus;
    (function (DiagnosticCategory) {
        DiagnosticCategory[DiagnosticCategory["Warning"] = 0] = "Warning";
        DiagnosticCategory[DiagnosticCategory["Error"] = 1] = "Error";
        DiagnosticCategory[DiagnosticCategory["Message"] = 2] = "Message";
    })(ts.DiagnosticCategory || (ts.DiagnosticCategory = {}));
    var DiagnosticCategory = ts.DiagnosticCategory;
})(ts || (ts = {}));
