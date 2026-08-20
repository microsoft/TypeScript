// @strict: false
// @target: ES5, ES2015
// @experimentaldecorators: true
declare function dec(target: any, propertyKey: string): void;

class C {
    public @dec prop;
}