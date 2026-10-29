// @strict: true
// @noEmit: true

interface Failure { readonly error: true; }
interface Box<Value> { value: Value; }
interface LoaderProps<Result extends {}> {
    readonly load: () => Box<Result>;
    readonly children: (result: Result & not Failure) => string;
}
class Loader<Result extends {}> {
    constructor(name: string, context: any);
    constructor(props: LoaderProps<Result>);
    constructor(...args: any[]) {}
}
function load(): Box<{ success: true } | Failure> {
    return null as any;
}

const loader = new Loader({
    load,
    children: result => result.success as any,
});

declare function inferInput<Result>(callback: (value: Result & not string) => void): Result;
const input = inferInput((value: number) => {});
const inputUnion: number | string = input;
const inputNumber: number = input;

declare function inferFilteredInput<Result>(callback: (value: Result & not Failure) => void): Result;
const filteredInput = inferFilteredInput((value: { success: true } & not Failure) => {});
const filteredUnion: { success: true } | Failure = filteredInput;
const filteredSuccess: { success: true } = filteredInput;

declare function inferOutput<Result>(callback: () => Result & not string): Result;
const output = inferOutput(() => 1);
const outputNumber: number = output;

declare const response: { success: true } | Failure;
declare function inferFiltered<Result>(value: Result, callback: (value: Result & not Failure) => void): Result;
const explicitFiltered = inferFiltered(response, (value: { success: true } & not Failure) => {});
const incompatibleFiltered = inferFiltered(response, (value: number) => {});

interface Tagged { tag: true; }
declare const maybeValue: { count: number } | undefined;
declare function inferTagged<Result>(value: Result, callback: (value: Result & Tagged) => void): Result;
const tagged = inferTagged(maybeValue, (value: { count: number } & Tagged) => {});