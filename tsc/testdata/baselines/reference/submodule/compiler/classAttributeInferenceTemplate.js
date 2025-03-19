//// [tests/cases/compiler/classAttributeInferenceTemplate.ts] ////

//// [classAttributeInferenceTemplate.ts]
class MyClass {
    property;
    property2;

    constructor() {
        const variable = 'something'

        this.property = `foo`; // Correctly inferred as `string`
        this.property2 = `foo-${variable}`; // Causes an error

        const localProperty = `foo-${variable}`; // Correctly inferred as `string`
    }
}

//// [classAttributeInferenceTemplate.js]
class MyClass {
    property;
    property2;
    constructor() {
        const variable = 'something';
        this.property = `foo`; // Correctly inferred as `string`
        this.property2 = `foo-${variable}`; // Causes an error
        const localProperty = `foo-${variable}`; // Correctly inferred as `string`
    }
}
