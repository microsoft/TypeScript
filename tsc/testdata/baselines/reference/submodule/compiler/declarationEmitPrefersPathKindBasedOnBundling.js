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
const scalar_1 = require("../lib/operators/scalar");
exports.default = {
    get xs() {
        return (0, scalar_1.scalar)("14px");
    }
};
