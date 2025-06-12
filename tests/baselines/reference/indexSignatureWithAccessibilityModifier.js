//// [tests/cases/compiler/indexSignatureWithAccessibilityModifier.ts] ////

//// [indexSignatureWithAccessibilityModifier.ts]
interface I {
    [public x: string]: string;
}

class C {
    [public x: string]: string
}

//// [indexSignatureWithAccessibilityModifier.js]
class C {
}
