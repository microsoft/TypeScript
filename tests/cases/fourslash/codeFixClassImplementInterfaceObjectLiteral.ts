/// <reference path='fourslash.ts' />

//// interface IPerson {
////     coordinate: {
////         x: number;
////         y: number;
////     }
//// }
//// class Person implements IPerson { }

verify.codeFix({
    description: "Implement interface 'IPerson'",
    newFileContent:
`interface IPerson {
    coordinate: {
        x: number;
        y: number;
    }
}
class Person implements IPerson {
    coordinate: { x: number; y: number; };
}`,
});