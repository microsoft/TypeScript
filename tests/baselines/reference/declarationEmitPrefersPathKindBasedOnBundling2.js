//// [tests/cases/compiler/declarationEmitPrefersPathKindBasedOnBundling2.ts] ////

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


//// [dist.js]
define("lib/operators/scalar", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.scalar = scalar;
    function scalar(value) {
        return null;
    }
});
define("settings/spacing", ["require", "exports", "lib/operators/scalar"], function (require, exports, scalar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        get xs() {
            return (0, scalar_1.scalar)("14px");
        }
    };
});


//// [dist.d.ts]
declare module "lib/operators/scalar" {
    export interface Scalar {
        (): string;
        value: number;
    }
    export function scalar(value: string): Scalar;
}
declare module "settings/spacing" {
    const _default: {
        readonly xs: import("lib/operators/scalar").Scalar;
    };
    export default _default;
}
