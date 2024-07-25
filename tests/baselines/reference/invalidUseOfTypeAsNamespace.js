//// [tests/cases/compiler/invalidUseOfTypeAsNamespace.ts] ////

//// [invalidUseOfTypeAsNamespace.ts]
interface OhNo {
}

declare let y: OhNo.hello;


//// [invalidUseOfTypeAsNamespace.js]
