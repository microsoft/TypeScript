/// <reference path='fourslash.ts' />

//// interface IPerson {
////     coordinate: {
////         x: number;
////         y: number;
////     }
//// }
//// class Person implements IPerson { }

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "IPerson"],
    index: 1,
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