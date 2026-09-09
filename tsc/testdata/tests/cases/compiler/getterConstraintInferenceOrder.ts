// @strict: true
// @noEmit: true

interface Schema<O> { readonly output: O; }
declare function wrap<T extends Schema<string>>(value: T): T;

function cold() {
    const argument = { get output() { return 42; } };
    return wrap(argument);
}

function warm() {
    const argument = { get output() { return 42; } };
    argument.output;
    return wrap(argument);
}

declare const coldResult: ReturnType<typeof cold>;
declare const warmResult: ReturnType<typeof warm>;
const coldToWarm: typeof warmResult = coldResult;
const warmToCold: typeof coldResult = warmResult;

function validCold() {
    const argument = { get output() { return ""; } };
    return wrap(argument);
}

function validWarm() {
    const argument = { get output() { return ""; } };
    argument.output;
    return wrap(argument);
}

const coldValue: string = validCold().output;
const warmValue: string = validWarm().output;

interface Box<T> { value: T; }
type DeferredBox<T> = Box<T>;
declare function box<T>(value: T): DeferredBox<T>;
declare function wrapBox<T extends Box<Schema<string>>>(value: T): T;

function coldBox() {
    const argument = box({ get output() { return 42; } });
    return wrapBox(argument);
}

function warmBox() {
    const argument = box({ get output() { return 42; } });
    argument.value.output;
    return wrapBox(argument);
}

declare const coldBoxResult: ReturnType<typeof coldBox>;
declare const warmBoxResult: ReturnType<typeof warmBox>;
const coldBoxToWarm: typeof warmBoxResult = coldBoxResult;
const warmBoxToCold: typeof coldBoxResult = warmBoxResult;
