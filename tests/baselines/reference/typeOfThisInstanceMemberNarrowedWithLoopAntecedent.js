//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInstanceMemberNarrowedWithLoopAntecedent.ts] ////

//// [typeOfThisInstanceMemberNarrowedWithLoopAntecedent.ts]
// #31995
type State = {
    type: "numberVariant";
    data: number;
} | {
    type: "stringVariant";
    data: string;
};

class SomeClass {
    state!: State;
    method() {
        while (0) { }
        this.state.data;
        if (this.state.type === "stringVariant") {
            const s: string = this.state.data;
        }
    }
}

class SomeClass2 {
    state!: State;
    method() {
        const c = false;
        while (c) { }
        if (this.state.type === "numberVariant") {
            this.state.data;
        }
        let n: number = this.state?.data; // This should be an error
    }
}

//// [typeOfThisInstanceMemberNarrowedWithLoopAntecedent.js]
var SomeClass = /** @class */ (function () {
    function SomeClass() {
    }
    SomeClass.prototype.method = function () {
        while (0) { }
        this.state.data;
        if (this.state.type === "stringVariant") {
            var s = this.state.data;
        }
    };
    return SomeClass;
}());
var SomeClass2 = /** @class */ (function () {
    function SomeClass2() {
    }
    SomeClass2.prototype.method = function () {
        var _a;
        var c = false;
        while (c) { }
        if (this.state.type === "numberVariant") {
            this.state.data;
        }
        var n = (_a = this.state) === null || _a === void 0 ? void 0 : _a.data; // This should be an error
    };
    return SomeClass2;
}());
