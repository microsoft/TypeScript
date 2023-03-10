//// [parserArgumentList1.ts]
export function removeClass (node:HTMLElement, className:string) {
	node.className = node.className.replace(_classNameRegexp(className), function (everything, leftDelimiter, name, rightDelimiter) {
		return leftDelimiter.length + rightDelimiter.length === 2 ? ' ' : '';
	});
}

//// [parserArgumentList1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeClass = void 0;
function removeClass(node, className) {
    node.className = node.className.replace(_classNameRegexp(className), function (everything, leftDelimiter, name, rightDelimiter) {
        return leftDelimiter.length + rightDelimiter.length === 2 ? ' ' : '';
    });
}
exports.removeClass = removeClass;
