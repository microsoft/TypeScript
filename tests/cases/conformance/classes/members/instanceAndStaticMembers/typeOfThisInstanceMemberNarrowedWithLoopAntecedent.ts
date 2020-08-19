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