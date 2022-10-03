// @declaration: true
// @target: es5
// @baseUrl: /.src/tests/cases/compiler
// @outDir: ./dist
// @rootDir: ./tests/cases/compiler/src
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
