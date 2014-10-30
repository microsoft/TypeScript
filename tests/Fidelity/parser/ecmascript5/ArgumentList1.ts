export function removeClass (node:HTMLElement, className:string) {
	node.className = node.className.replace(_classNameRegexp(className), function (everything, leftDelimiter, name, rightDelimiter) {
		return leftDelimiter.length + rightDelimiter.length === 2 ? ' ' : '';
	});
}