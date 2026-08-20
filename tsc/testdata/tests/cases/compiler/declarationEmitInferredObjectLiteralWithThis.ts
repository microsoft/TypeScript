// @declaration: true

export class C {
    foo() {
        return {
            self: this,
        };
    }

    prop = {
        self: this,
    };
}
