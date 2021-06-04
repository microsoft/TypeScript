// @target: ES5
// @experimentaldecorators: true
declare function dec(target: any, propertyKey: string): void;

class C {
    public @dec prop;
}

const C1 = class {
    public @dec prop;
}
