//// [tests/cases/compiler/noImplicitThisBigThis.ts] ////

//// [noImplicitThisBigThis.ts]
// https://github.com/microsoft/TypeScript/issues/29902

function createObj() {
    return {
        func1() {
            return this;
        },
        func2() {
            return this;
        },
        func3() {
            return this;
        }
    };
}

function createObjNoCrash() {
    return {
        func1() {
            return this;
        },
        func2() {
            return this;
        },
        func3() {
            return this;
        },
        func4() {
            return this;
        },
        func5() {
            return this;
        },
        func6() {
            return this;
        },
        func7() {
            return this;
        },
        func8() {
            return this;
        },
        func9() {
            return this;
        }
    };
}


//// [noImplicitThisBigThis.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/29902
function createObj() {
    return {
        func1() {
            return this;
        },
        func2() {
            return this;
        },
        func3() {
            return this;
        }
    };
}
function createObjNoCrash() {
    return {
        func1() {
            return this;
        },
        func2() {
            return this;
        },
        func3() {
            return this;
        },
        func4() {
            return this;
        },
        func5() {
            return this;
        },
        func6() {
            return this;
        },
        func7() {
            return this;
        },
        func8() {
            return this;
        },
        func9() {
            return this;
        }
    };
}


//// [noImplicitThisBigThis.d.ts]
declare function createObj(): {
    func1(): {
        func1(): /*elided*/ any;
        func2(): /*elided*/ any;
        func3(): /*elided*/ any;
    };
    func2(): {
        func1(): any;
        func2(): any;
        func3(): any;
    };
    func3(): {
        func1(): any;
        func2(): any;
        func3(): any;
    };
};
declare function createObjNoCrash(): {
    func1(): {
        func1(): /*elided*/ any;
        func2(): /*elided*/ any;
        func3(): /*elided*/ any;
        func4(): /*elided*/ any;
        func5(): /*elided*/ any;
        func6(): /*elided*/ any;
        func7(): /*elided*/ any;
        func8(): /*elided*/ any;
        func9(): /*elided*/ any;
    };
    func2(): {
        func1(): any;
        func2(): any;
        func3(): any;
        func4(): any;
        func5(): any;
        func6(): any;
        func7(): any;
        func8(): any;
        func9(): any;
    };
    func3(): {
        func1(): any;
        func2(): any;
        func3(): any;
        func4(): any;
        func5(): any;
        func6(): any;
        func7(): any;
        func8(): any;
        func9(): any;
    };
    func4(): {
        func1(): any;
        func2(): any;
        func3(): any;
        func4(): any;
        func5(): any;
        func6(): any;
        func7(): any;
        func8(): any;
        func9(): any;
    };
    func5(): {
        func1(): any;
        func2(): any;
        func3(): any;
        func4(): any;
        func5(): any;
        func6(): any;
        func7(): any;
        func8(): any;
        func9(): any;
    };
    func6(): {
        func1(): any;
        func2(): any;
        func3(): any;
        func4(): any;
        func5(): any;
        func6(): any;
        func7(): any;
        func8(): any;
        func9(): any;
    };
    func7(): {
        func1(): any;
        func2(): any;
        func3(): any;
        func4(): any;
        func5(): any;
        func6(): any;
        func7(): any;
        func8(): any;
        func9(): any;
    };
    func8(): {
        func1(): any;
        func2(): any;
        func3(): any;
        func4(): any;
        func5(): any;
        func6(): any;
        func7(): any;
        func8(): any;
        func9(): any;
    };
    func9(): {
        func1(): any;
        func2(): any;
        func3(): any;
        func4(): any;
        func5(): any;
        func6(): any;
        func7(): any;
        func8(): any;
        func9(): any;
    };
};
