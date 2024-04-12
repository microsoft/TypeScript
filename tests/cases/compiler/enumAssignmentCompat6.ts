// @filename: a.ts
namespace numerics {
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

namespace strings {
    export enum DiagnosticCategory {
        Warning = "Warning",
        Error = "Error",
        Suggestion = "Suggestion",
        Message = "Message",
    }
}

declare namespace ambients {
    export enum DiagnosticCategory {
        Warning,
        Error,
        Suggestion,
        Message,
    }
}

function f(x: numerics.DiagnosticCategory, y: strings.DiagnosticCategory) {
    x = y;
    y = x;
}

function g(x: numerics.DiagnosticCategory2, y: strings.DiagnosticCategory) {
    x = y;
    y = x;
}

function h(x: numerics.DiagnosticCategory, y: ambients.DiagnosticCategory) {
    x = y;
    y = x;
}

function i(x: strings.DiagnosticCategory, y: ambients.DiagnosticCategory) {
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

(() => {
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
})()