//// [tests/cases/compiler/genericTemplateOverloadResolution.ts] ////

//// [genericTemplateOverloadResolution.ts]
interface IFooFn {
    (strings: TemplateStringsArray): Promise<{}>;
    <T>(strings: TemplateStringsArray): Promise<T>;
}

declare const fooFn: IFooFn;

declare function expect(x: Promise<number>): void;

expect(fooFn<number>``);


//// [genericTemplateOverloadResolution.js]
expect(fooFn ``);
