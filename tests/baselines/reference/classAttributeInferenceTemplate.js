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
"use strict";
var MyClass = /** @class */ (function () {
    function MyClass() {
        var variable = 'something';
        this.property = "foo"; // Correctly inferred as `string`
        this.property2 = "foo-".concat(variable); // Causes an error
        var localProperty = "foo-".concat(variable); // Correctly inferred as `string`
    }
    return MyClass;
}());
