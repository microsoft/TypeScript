//// [genericTemplateOverloadResolution.ts]
interface IFooFn {
    (strings: TemplateStringsArray): Promise<{}>;
    <T>(strings: TemplateStringsArray): Promise<T>;
}

declare const fooFn: IFooFn;

declare function expect(x: Promise<number>): void;

expect(fooFn<number>``);


//// [genericTemplateOverloadResolution.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
expect(fooFn(__makeTemplateObject([""], [""])));
