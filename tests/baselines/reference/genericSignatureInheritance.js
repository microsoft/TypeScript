//// [genericSignatureInheritance.ts]
interface I {
    <T>(x: T): string;
}

interface I2 extends I { }


//// [genericSignatureInheritance.js]
