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
class SomeClass {
    state;
    method() {
        while (0) { }
        this.state.data;
        if (this.state.type === "stringVariant") {
            const s = this.state.data;
        }
    }
}
class SomeClass2 {
    state;
    method() {
        var _a;
        const c = false;
        while (c) { }
        if (this.state.type === "numberVariant") {
            this.state.data;
        }
        let n = (_a = this.state) === null || _a === void 0 ? void 0 : _a.data; // This should be an error
    }
}
