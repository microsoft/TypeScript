// https://github.com/Microsoft/TypeScript/issues/11038
() => function () {
    for (let someKey in {}) {
        this.helloWorld();
        () => someKey;
    }
};