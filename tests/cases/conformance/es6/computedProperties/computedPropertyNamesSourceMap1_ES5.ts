// @target: es5, es2015
// @sourceMap: true
class C {
    ["hello"]() {
        debugger;
    }
    get ["goodbye"]() {
		return 0;
    }
}