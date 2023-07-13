//// [tests/cases/compiler/modifiersOnInterfaceIndexSignature1.ts] ////

//// [modifiersOnInterfaceIndexSignature1.ts]
interface I {
  public [a: string]: number;
}

//// [modifiersOnInterfaceIndexSignature1.js]
