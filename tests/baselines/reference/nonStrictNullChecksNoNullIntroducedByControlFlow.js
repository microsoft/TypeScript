//// [nonStrictNullChecksNoNullIntroducedByControlFlow.ts]
export function clone<T>(obj: T): T {
	if (!obj || typeof obj !== 'object') {
		return obj;
	}
	var result = (Array.isArray(obj)) ? <any>[] : <any>{};
	Object.keys(obj).forEach((key) => {
		if (obj[key] && typeof obj[key] === 'object') {
			result[key] = clone(obj[key]);
		} else {
			result[key] = obj[key];
		}
	});
	return result;
}

//// [nonStrictNullChecksNoNullIntroducedByControlFlow.js]
"use strict";
exports.__esModule = true;
exports.clone = void 0;
function clone(obj) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    var result = (Array.isArray(obj)) ? [] : {};
    Object.keys(obj).forEach(function (key) {
        if (obj[key] && typeof obj[key] === 'object') {
            result[key] = clone(obj[key]);
        }
        else {
            result[key] = obj[key];
        }
    });
    return result;
}
exports.clone = clone;
