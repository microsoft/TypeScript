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
export function scalar(value) {
    return null;
}
//// [spacing.js]
import { scalar } from '../lib/operators/scalar';
export default {
    get xs() {
        return scalar("14px");
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
