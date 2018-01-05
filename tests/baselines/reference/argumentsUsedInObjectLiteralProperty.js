//// [argumentsUsedInObjectLiteralProperty.ts]
class A {
    public static createSelectableViewModel(initialState?: any, selectedValue?: any) {
        return {
            selectedValue: arguments.length
        };
    }
}

//// [argumentsUsedInObjectLiteralProperty.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.createSelectableViewModel = function (initialState, selectedValue) {
        return {
            selectedValue: arguments.length
        };
    };
    return A;
}());
