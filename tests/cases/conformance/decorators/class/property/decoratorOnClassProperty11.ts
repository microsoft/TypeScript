// @target: ES5
declare function dec(): <T>(target: any, propertyKey: string) => void;

class C {
    @dec prop;
}