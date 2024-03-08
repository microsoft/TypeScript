// @target: ES2015
// @experimentaldecorators: true
declare function dec(target: any, propertyKey: string, desc: PropertyDescriptor): void;

class C {
    @dec accessor prop;
}