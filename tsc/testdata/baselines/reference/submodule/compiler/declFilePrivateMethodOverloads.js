//// [tests/cases/compiler/declFilePrivateMethodOverloads.ts] ////

//// [declFilePrivateMethodOverloads.ts]
interface IContext {
    someMethod();
}
class c1 {
    private _forEachBindingContext(bindingContext: IContext, fn: (bindingContext: IContext) => void);
    private _forEachBindingContext(bindingContextArray: Array<IContext>, fn: (bindingContext: IContext) => void);
    private _forEachBindingContext(context, fn: (bindingContext: IContext) => void): void {
        // Function here
    }

    private overloadWithArityDifference(bindingContext: IContext);
    private overloadWithArityDifference(bindingContextArray: Array<IContext>, fn: (bindingContext: IContext) => void);
    private overloadWithArityDifference(context): void {
        // Function here
    }
}
declare class c2 {
    private overload1(context, fn);

    private overload2(context);
    private overload2(context, fn);
}

//// [declFilePrivateMethodOverloads.js]
class c1 {
    _forEachBindingContext(context, fn) {
        // Function here
    }
    overloadWithArityDifference(context) {
        // Function here
    }
}
