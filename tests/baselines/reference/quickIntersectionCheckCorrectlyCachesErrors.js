//// [quickIntersectionCheckCorrectlyCachesErrors.tsx]
interface F<P> {
    (props: P & { children?: boolean }): void;
    propTypes: { [K in keyof P]: null extends P ? K : K };
}
declare function g(C: F<unknown>): string;
export function wu<CP extends { o: object }>(CC: F<CP>) {
    class WU {
        m() {
            g(CC)
            return <CC {...(null as unknown as CP)} />;
        }
    }
}


//// [quickIntersectionCheckCorrectlyCachesErrors.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.wu = void 0;
function wu(CC) {
    var WU = /** @class */ (function () {
        function WU() {
        }
        WU.prototype.m = function () {
            g(CC);
            return React.createElement(CC, __assign({}, null));
        };
        return WU;
    }());
}
exports.wu = wu;
