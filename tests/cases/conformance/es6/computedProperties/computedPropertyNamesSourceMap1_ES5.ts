// @target: es5
// @sourceMap: true
class C {
    ["hello"]() {
        debugger;
    }
    get ["goodbye"]() {
		return 0;
    }
}