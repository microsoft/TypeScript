//// [tests/cases/compiler/missingDomElement_UsingDomLib.ts] ////

//// [missingDomElement_UsingDomLib.ts]
interface HTMLMissingElement {}

(({}) as any as HTMLMissingElement).textContent;


//// [missingDomElement_UsingDomLib.js]
({}).textContent;
