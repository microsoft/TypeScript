//// [tests/cases/compiler/enumAssignmentCompat6.ts] ////

//// [f.ts]
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

//// [f.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = exports.DiagnosticCategory = void 0;
// @filename a.ts
var a;
(function (a) {
    var DiagnosticCategory;
    (function (DiagnosticCategory) {
        DiagnosticCategory[DiagnosticCategory["Warning"] = 0] = "Warning";
        DiagnosticCategory[DiagnosticCategory["Error"] = 1] = "Error";
        DiagnosticCategory[DiagnosticCategory["Suggestion"] = 2] = "Suggestion";
        DiagnosticCategory[DiagnosticCategory["Message"] = 3] = "Message";
    })(DiagnosticCategory = a.DiagnosticCategory || (a.DiagnosticCategory = {}));
    var DiagnosticCategory2;
    (function (DiagnosticCategory2) {
        DiagnosticCategory2[DiagnosticCategory2["Warning"] = 0] = "Warning";
        DiagnosticCategory2[DiagnosticCategory2["Error"] = 1] = "Error";
        DiagnosticCategory2[DiagnosticCategory2["Suggestion"] = 2] = "Suggestion";
        DiagnosticCategory2[DiagnosticCategory2["Message"] = 3] = "Message";
    })(DiagnosticCategory2 = a.DiagnosticCategory2 || (a.DiagnosticCategory2 = {}));
})(a || (a = {}));
var b;
(function (b) {
    var DiagnosticCategory;
    (function (DiagnosticCategory) {
        DiagnosticCategory["Warning"] = "Warning";
        DiagnosticCategory["Error"] = "Error";
        DiagnosticCategory["Suggestion"] = "Suggestion";
        DiagnosticCategory["Message"] = "Message";
    })(DiagnosticCategory = b.DiagnosticCategory || (b.DiagnosticCategory = {}));
})(b || (b = {}));
function f(x, y) {
    x = y;
    y = x;
}
function g(x, y) {
    x = y;
    y = x;
}
var DiagnosticCategory;
(function (DiagnosticCategory) {
    DiagnosticCategory[DiagnosticCategory["Warning"] = 0] = "Warning";
    DiagnosticCategory[DiagnosticCategory["Error"] = 1] = "Error";
    DiagnosticCategory[DiagnosticCategory["Suggestion"] = 2] = "Suggestion";
    DiagnosticCategory[DiagnosticCategory["Message"] = 3] = "Message";
})(DiagnosticCategory || (exports.DiagnosticCategory = DiagnosticCategory = {}));
{
    var DiagnosticCategory_1;
    (function (DiagnosticCategory) {
        DiagnosticCategory["Warning"] = "Warning";
        DiagnosticCategory["Error"] = "Error";
        DiagnosticCategory["Suggestion"] = "Suggestion";
        DiagnosticCategory["Message"] = "Message";
    })(DiagnosticCategory_1 || (DiagnosticCategory_1 = {}));
    function f(y) {
        exports.x = y;
        y = exports.x;
    }
}
