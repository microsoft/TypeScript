// @target: ES2015
// @experimentaldecorators: true
declare function dec(target: any, propertyKey: string): void;

class C {
    @dec accessor prop;
}