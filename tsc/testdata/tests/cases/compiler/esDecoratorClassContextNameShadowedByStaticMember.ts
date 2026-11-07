// @target: es2022
// @noTypesAndSymbols: true

declare function dec(target: any, context: ClassDecoratorContext): void;

@dec
class A {
    static get name() { return 2434; }
}

@dec
class B {
    static name() { return 2434; }
}

const C = @dec class {
    static get name() { return 2434; }
};
