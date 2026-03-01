// @module: commonjs
// @target: es5, es2015
// @declaration: true
// @baseUrl: .
// @outDir: ./dist
// @rootDir: ./src
// @filename: src/lib/operators/scalar.ts
export interface Scalar {
	(): string;
	value: number;
}

export function scalar(value: string): Scalar {
	return null as any;
}
// @filename: src/settings/spacing.ts
import { scalar } from '../lib/operators/scalar';

export default {
	get xs() {
		return scalar("14px");
	}
};
