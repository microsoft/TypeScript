// @target: ES5
// @experimentaldecorators: true
declare function dec(target: any, propertyKey: string): void;

class C {
    @dec prop;
}