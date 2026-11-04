//// [tests/cases/compiler/correlatedLabelNullishFallback.ts] ////

//// [correlatedLabelNullishFallback.ts]
function label(options: { label: string; alias: string } | { label: object; alias?: string }) {
    if (typeof options.label === "string") return options.alias ?? options.label;
}


//// [correlatedLabelNullishFallback.js]
"use strict";
function label(options) {
    if (typeof options.label === "string")
        return options.alias ?? options.label;
}
