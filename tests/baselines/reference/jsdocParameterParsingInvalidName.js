//// [tests/cases/compiler/jsdocParameterParsingInvalidName.ts] ////

//// [jsdocParameterParsingInvalidName.ts]
class c {
    /**
     * @param {string} [`foo]
     */
    method(foo) {
    }
}

//// [jsdocParameterParsingInvalidName.js]
class c {
    /**
     * @param {string} [`foo]
     */
    method(foo) {
    }
}
