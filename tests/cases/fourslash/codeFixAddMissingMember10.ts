/// <reference path='fourslash.ts' />

//// class C {}
//// const n: number = new C().add(1, 2);

verify.codeFixAll({
    fixId: "addMissingMember",
    fixAllDescription: "Add all missing members",
    newFileContent:
`class C {
    add(arg0: number, arg1: number): number {
        throw new Error("Method not implemented.");
    }
}
const n: number = new C().add(1, 2);`,
});
