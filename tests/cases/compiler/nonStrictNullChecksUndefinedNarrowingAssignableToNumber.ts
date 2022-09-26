export function hash(obj: any, hashVal = 0): number {
	switch (typeof obj) {
		case 'number':
			return numberHash(obj, hashVal);
		case 'undefined':
			return numberHash(obj, 937);
		default:
			return numberHash(obj, 617);
	}
}

declare function numberHash(val: number, initialHashVal: number): number;