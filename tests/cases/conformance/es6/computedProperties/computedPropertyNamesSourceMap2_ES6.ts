// @target: es6
// @sourceMap: true
var v = {
    ["hello"]() {
        debugger;
	},
	get ["goodbye"]() {
		return 0;
	}
}