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
type createObj_recursive = {
    func1(): createObj_recursive;
    func2(): createObj_recursive;
    func3(): createObj_recursive;
};
type createObjNoCrash_recursive = {
    func1(): createObjNoCrash_recursive;
    func2(): createObjNoCrash_recursive;
    func3(): createObjNoCrash_recursive;
    func4(): createObjNoCrash_recursive;
    func5(): createObjNoCrash_recursive;
    func6(): createObjNoCrash_recursive;
    func7(): createObjNoCrash_recursive;
    func8(): createObjNoCrash_recursive;
    func9(): createObjNoCrash_recursive;
};
declare function createObj(): {
    func1(): createObj_recursive;
    func2(): createObj_recursive;
    func3(): createObj_recursive;
};
declare function createObjNoCrash(): {
    func1(): createObjNoCrash_recursive;
    func2(): createObjNoCrash_recursive;
    func3(): createObjNoCrash_recursive;
    func4(): createObjNoCrash_recursive;
    func5(): createObjNoCrash_recursive;
    func6(): createObjNoCrash_recursive;
    func7(): createObjNoCrash_recursive;
    func8(): createObjNoCrash_recursive;
    func9(): createObjNoCrash_recursive;
};
