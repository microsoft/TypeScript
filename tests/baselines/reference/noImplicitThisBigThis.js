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
// https://github.com/microsoft/TypeScript/issues/29902
function createObj() {
    return {
        func1: function () {
            return this;
        },
        func2: function () {
            return this;
        },
        func3: function () {
            return this;
        }
    };
}
function createObjNoCrash() {
    return {
        func1: function () {
            return this;
        },
        func2: function () {
            return this;
        },
        func3: function () {
            return this;
        },
        func4: function () {
            return this;
        },
        func5: function () {
            return this;
        },
        func6: function () {
            return this;
        },
        func7: function () {
            return this;
        },
        func8: function () {
            return this;
        },
        func9: function () {
            return this;
        }
    };
}


//// [noImplicitThisBigThis.d.ts]
declare function createObj(): {
    func1(): any;
    func2(): any;
    func3(): any;
};
declare function createObjNoCrash(): {
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
