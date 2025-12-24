// @strict: true
// @target: esnext
class MyClass {
    property;
    property2;

    constructor() {
        const variable = 'something'

        this.property = `foo`;
        this.property2 = `foo-${variable}`;

        const localProperty = `foo-${variable}`;
    }
}

class MyClass2 {
    accessor property;
    accessor property2;

    constructor() {
        const variable = 'something'

        this.property = `foo`;
        this.property2 = `foo-${variable}`;

        const localProperty = `foo-${variable}`;
    }
}

class MyClass3 {
    property;
    property2;

    constructor() {
        (() => {
            const variable = 'something'

            this.property = `foo`;
            this.property2 = `foo-${variable}`;

            const localProperty = `foo-${variable}`;
        })();
    }
}

class MyClass4 {
    accessor property;
    accessor property2;

    constructor() {
        (() => {
            const variable = 'something'

            this.property = `foo`;
            this.property2 = `foo-${variable}`;

            const localProperty = `foo-${variable}`;
        })();
    }
}
