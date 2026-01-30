// @target: es5, es2015
// @sourceMap: true
var v = {
    ["hello"]() {
        debugger;
	},
    get ["goodbye"]() {
		return 0;
	}
}