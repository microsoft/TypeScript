//// [interfaceMayNotBeExtendedWitACall.ts]
interface color {}

interface blue extends color() { // error

}


//// [interfaceMayNotBeExtendedWitACall.js]
