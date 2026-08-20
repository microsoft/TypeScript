// @target: es2015
interface I {
    <T>(x: T): string;
}

interface I2 extends I { 
    <T>(x: T): void;
}
