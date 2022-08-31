//// [nonStrictNullChecksUndefinedNarrowingAssignableToNumber.ts]
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

//// [nonStrictNullChecksUndefinedNarrowingAssignableToNumber.js]
"use strict";
exports.__esModule = true;
exports.hash = void 0;
function hash(obj, hashVal) {
    if (hashVal === void 0) { hashVal = 0; }
    switch (typeof obj) {
        case 'number':
            return numberHash(obj, hashVal);
        case 'undefined':
            return numberHash(obj, 937);
        default:
            return numberHash(obj, 617);
    }
}
exports.hash = hash;
