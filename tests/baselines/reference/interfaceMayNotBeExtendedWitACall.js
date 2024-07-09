//// [tests/cases/compiler/interfaceMayNotBeExtendedWitACall.ts] ////

//// [interfaceMayNotBeExtendedWitACall.ts]
interface color {}

interface blue extends color() { // error

}


//// [interfaceMayNotBeExtendedWitACall.js]
