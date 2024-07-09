// @target: es6
// @sourceMap: true
class C {
    ["hello"]() {
        debugger;
	}
	get ["goodbye"]() {
		return 0;
	}
}