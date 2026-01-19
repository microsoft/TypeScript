// @strict: false
// @noEmit: true
// @checkJs: true
// @filename: errorIsolation.js
const async = { doSomething: _ => {} };
async.doSomething(
	/***/
	() => {}
);