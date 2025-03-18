//// [tests/cases/compiler/argumentsUsedInObjectLiteralProperty.ts] ////

//// [argumentsUsedInObjectLiteralProperty.ts]
class A {
    public static createSelectableViewModel(initialState?: any, selectedValue?: any) {
        return {
            selectedValue: arguments.length
        };
    }
}

//// [argumentsUsedInObjectLiteralProperty.js]
class A {
    static createSelectableViewModel(initialState, selectedValue) {
        return {
            selectedValue: arguments.length
        };
    }
}
