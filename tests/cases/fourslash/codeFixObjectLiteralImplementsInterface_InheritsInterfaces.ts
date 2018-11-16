/// <reference path='fourslash.ts' />

//// interface car { drive(): void; }
//// interface boat { swim(): void; }
//// interface amphibian extends car, boat {}
//// let VAB: amphibian = { }

verify.codeFix({
    description: "Implement interface 'amphibian'",
    newFileContent:
`interface car { drive(): void; }
interface boat { swim(): void; }
interface amphibian extends car, boat {}
let VAB: amphibian = {
    drive(): void {
        throw new Error("Method not implemented.");
    },
    swim(): void {
        throw new Error("Method not implemented.");
    },
}`,
});