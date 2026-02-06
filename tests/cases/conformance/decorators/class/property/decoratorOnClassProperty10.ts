// @strict: false
// @target: ES5, ES2015
// @experimentaldecorators: true
declare function dec(): <T>(target: any, propertyKey: string) => void;

class C {
    @dec() prop;
}