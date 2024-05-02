//// [tests/cases/compiler/declarationEmitPrefersPathKindBasedOnBundling.ts] ////

//// [scalar.ts]
export interface Scalar {
	(): string;
	value: number;
}

export function scalar(value: string): Scalar {
	return null as any;
}
//// [spacing.ts]
import { scalar } from '../lib/operators/scalar';

export default {
	get xs() {
		return scalar("14px");
	}
};


//// [scalar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scalar = scalar;
function scalar(value) {
    return null;
}
//// [spacing.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scalar_1 = require("../lib/operators/scalar");
exports.default = {
    get xs() {
        return (0, scalar_1.scalar)("14px");
    }
};


//// [scalar.d.ts]
export interface Scalar {
    (): string;
    value: number;
}
export declare function scalar(value: string): Scalar;
//// [spacing.d.ts]
declare const _default: {
    readonly xs: import("../lib/operators/scalar").Scalar;
};
export default _default;
