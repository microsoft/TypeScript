// @target: ES5
// @experimentaldecorators: true
declare function dec(): <T>(target: any, propertyKey: string) => void;

class C {
    @dec prop;
}