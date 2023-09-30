// @filename a.ts
namespace a {
    export enum DiagnosticCategory {
        Warning,
        Error,
        Suggestion,
        Message,
    }

    export enum DiagnosticCategory2 {
        Warning,
        Error,
        Suggestion,
        Message,
    }
}

namespace b {
    export enum DiagnosticCategory {
        Warning = "Warning",
        Error = "Error",
        Suggestion = "Suggestion",
        Message = "Message",
    }
}

function f(x: a.DiagnosticCategory, y: b.DiagnosticCategory) {
    x = y;
    y = x;
}

function g(x: a.DiagnosticCategory2, y: b.DiagnosticCategory) {
    x = y;
    y = x;
}


// @filename: f.ts
export enum DiagnosticCategory {
    Warning,
    Error,
    Suggestion,
    Message,
}

export let x: DiagnosticCategory;

{
    enum DiagnosticCategory {
        Warning = "Warning",
        Error = "Error",
        Suggestion = "Suggestion",
        Message = "Message",
    }
    function f(y: DiagnosticCategory) {
        x = y;
        y = x;
    }
}