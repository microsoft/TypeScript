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
    exports.scalar = void 0;
    function scalar(value) {
        return null;
    }
    exports.scalar = scalar;
});
define("settings/spacing", ["require", "exports", "lib/operators/scalar"], function (require, exports, scalar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        get xs() {
            return scalar_1.scalar("14px");
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
        readonly xs: import("../lib/operators/scalar").Scalar;
    };
    export default _default;
}


//// [DtsFileErrors]


dist.d.ts(10,29): error TS2792: Cannot find module '../lib/operators/scalar'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?


==== ./dist.d.ts (1 errors) ====
    declare module "lib/operators/scalar" {
        export interface Scalar {
            (): string;
            value: number;
        }
        export function scalar(value: string): Scalar;
    }
    declare module "settings/spacing" {
        const _default: {
            readonly xs: import("../lib/operators/scalar").Scalar;
                                ~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS2792: Cannot find module '../lib/operators/scalar'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?
        };
        export default _default;
    }
    