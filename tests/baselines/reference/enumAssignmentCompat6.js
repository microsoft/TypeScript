//// [tests/cases/compiler/enumAssignmentCompat6.ts] ////

//// [f.ts]
// @filename a.ts
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

//// [f.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = exports.DiagnosticCategory = void 0;
// @filename a.ts
var numerics;
(function (numerics) {
    var DiagnosticCategory;
    (function (DiagnosticCategory) {
        DiagnosticCategory[DiagnosticCategory["Warning"] = 0] = "Warning";
        DiagnosticCategory[DiagnosticCategory["Error"] = 1] = "Error";
        DiagnosticCategory[DiagnosticCategory["Suggestion"] = 2] = "Suggestion";
        DiagnosticCategory[DiagnosticCategory["Message"] = 3] = "Message";
    })(DiagnosticCategory = numerics.DiagnosticCategory || (numerics.DiagnosticCategory = {}));
    var DiagnosticCategory2;
    (function (DiagnosticCategory2) {
        DiagnosticCategory2[DiagnosticCategory2["Warning"] = 0] = "Warning";
        DiagnosticCategory2[DiagnosticCategory2["Error"] = 1] = "Error";
        DiagnosticCategory2[DiagnosticCategory2["Suggestion"] = 2] = "Suggestion";
        DiagnosticCategory2[DiagnosticCategory2["Message"] = 3] = "Message";
    })(DiagnosticCategory2 = numerics.DiagnosticCategory2 || (numerics.DiagnosticCategory2 = {}));
})(numerics || (numerics = {}));
var strings;
(function (strings) {
    var DiagnosticCategory;
    (function (DiagnosticCategory) {
        DiagnosticCategory["Warning"] = "Warning";
        DiagnosticCategory["Error"] = "Error";
        DiagnosticCategory["Suggestion"] = "Suggestion";
        DiagnosticCategory["Message"] = "Message";
    })(DiagnosticCategory = strings.DiagnosticCategory || (strings.DiagnosticCategory = {}));
})(strings || (strings = {}));
function f(x, y) {
    x = y;
    y = x;
}
function g(x, y) {
    x = y;
    y = x;
}
function h(x, y) {
    x = y;
    y = x;
}
function i(x, y) {
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
(function () {
    var DiagnosticCategory;
    (function (DiagnosticCategory) {
        DiagnosticCategory["Warning"] = "Warning";
        DiagnosticCategory["Error"] = "Error";
        DiagnosticCategory["Suggestion"] = "Suggestion";
        DiagnosticCategory["Message"] = "Message";
    })(DiagnosticCategory || (DiagnosticCategory = {}));
    function f(y) {
        exports.x = y;
        y = exports.x;
    }
})();
