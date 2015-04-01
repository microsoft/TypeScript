// @target: ES5
declare function dec(target: any, propertyKey: string): void;

class C {
    public @dec prop;
}