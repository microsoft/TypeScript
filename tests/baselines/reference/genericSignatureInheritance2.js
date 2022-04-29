//// [genericSignatureInheritance2.ts]
interface I {
    <T>(x: T): string;
}

interface I2 extends I { 
    <T>(x: T): void;
}


//// [genericSignatureInheritance2.js]
