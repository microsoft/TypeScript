//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesSourceMap2_ES6.ts] ////

//// [computedPropertyNamesSourceMap2_ES6.ts]
var v = {
    ["hello"]() {
        debugger;
	},
	get ["goodbye"]() {
		return 0;
	}
}

//// [computedPropertyNamesSourceMap2_ES6.js]
var v = {
    ["hello"]() {
        debugger;
    },
    get ["goodbye"]() {
        return 0;
    }
};
//# sourceMappingURL=computedPropertyNamesSourceMap2_ES6.js.map