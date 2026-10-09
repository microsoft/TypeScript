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
type _recursive = {
    func1(): _recursive;
    func2(): _recursive;
    func3(): _recursive;
};
type _recursive_1 = {
    func1(): _recursive_1;
    func2(): _recursive_1;
    func3(): _recursive_1;
    func4(): _recursive_1;
    func5(): _recursive_1;
    func6(): _recursive_1;
    func7(): _recursive_1;
    func8(): _recursive_1;
    func9(): _recursive_1;
};
declare function createObj(): {
    func1(): _recursive;
    func2(): _recursive;
    func3(): _recursive;
};
declare function createObjNoCrash(): {
    func1(): _recursive_1;
    func2(): _recursive_1;
    func3(): _recursive_1;
    func4(): _recursive_1;
    func5(): _recursive_1;
    func6(): _recursive_1;
    func7(): _recursive_1;
    func8(): _recursive_1;
    func9(): _recursive_1;
};
