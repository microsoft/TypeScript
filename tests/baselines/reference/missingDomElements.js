//// [tests/cases/compiler/missingDomElements.ts] ////

//// [missingDomElements.ts]
interface Element {}
interface EventTarget {}
interface HTMLElement {}
interface HTMLInputElement {}

({} as any as Element).textContent;
({} as any as HTMLElement).textContent;
({} as any as HTMLInputElement).textContent;
({} as any as EventTarget & HTMLInputElement).textContent

interface HTMLElementFake {}
interface Node {
    actuallyNotTheSame: number;    
};

({} as any as HTMLElementFake).textContent;
({} as any as Node).textContent;


//// [missingDomElements.js]
({}.textContent);
({}.textContent);
({}.textContent);
({}.textContent);
;
({}.textContent);
({}.textContent);
