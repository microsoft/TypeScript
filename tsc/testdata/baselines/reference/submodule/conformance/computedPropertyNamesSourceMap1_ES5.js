//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesSourceMap1_ES5.ts] ////

//// [computedPropertyNamesSourceMap1_ES5.ts]
class C {
    ["hello"]() {
        debugger;
    }
    get ["goodbye"]() {
		return 0;
    }
}

//// [computedPropertyNamesSourceMap1_ES5.js]
class C {
    ["hello"]() {
        debugger;
    }
    get ["goodbye"]() {
        return 0;
    }
}
//# sourceMappingURL=computedPropertyNamesSourceMap1_ES5.js.map