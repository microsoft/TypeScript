// @target: esnext, es2022, es2015, es5
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

const method3 = "method3";

abstract class C {
    @dec(1) abstract method1(): void;
    @dec(2) abstract ["method2"](): void;
    @dec(3) abstract [method3](): void;
}
