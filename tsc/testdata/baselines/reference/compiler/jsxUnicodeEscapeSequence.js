//// [tests/cases/compiler/jsxUnicodeEscapeSequence.tsx] ////

//// [jsxUnicodeEscapeSequence.tsx]
/// <reference path="/.lib/react16.d.ts" />

export const InlineUnicodeChar = () => {
    // This should work correctly - inline character with other content
    return <div><span>Warning: ⚠ Error</span></div>;
};

export const StandaloneUnicodeChar = () => {
    // This should reproduce the issue - unicode character on its own line
    return (<div><span>⚠</span>
        ⚠
    </div>);
};

export const MultipleUnicodeChars = () => {
    // Test multiple unicode characters
    return (<div>
        ⚠
        ⛔
        🚨
    </div>);
};


//// [jsxUnicodeEscapeSequence.js]
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/// <reference path="react16.d.ts" />
export const InlineUnicodeChar = () => {
    // This should work correctly - inline character with other content
    return _jsx("div", { children: _jsx("span", { children: "Warning: \u26A0 Error" }) });
};
export const StandaloneUnicodeChar = () => {
    // This should reproduce the issue - unicode character on its own line
    return (_jsxs("div", { children: [_jsx("span", { children: "\u26A0" }), "\u26A0"] }));
};
export const MultipleUnicodeChars = () => {
    // Test multiple unicode characters
    return (_jsx("div", { children: "\u26A0 \u26D4 \uD83D\uDEA8" }));
};
