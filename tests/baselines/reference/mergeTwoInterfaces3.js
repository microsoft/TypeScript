//// [tests/cases/conformance/interfaces/declarationMerging/mergeTwoInterfaces3.ts] ////

//// [mergeTwoInterfaces3.ts]
interface Chainable<Subject = any> {
    within(fn: (prevSubject: Subject) => Chainable<Subject>): Chainable<Subject>;
}

interface Chainable<Subject = any, ExtraType = undefined> {
    within(fn: (prevSubject: Subject, extra: ExtraType) => Chainable<Subject>): Chainable<Subject, ExtraType>;
}

interface ChainableLike<Subject = any, ExtraType = undefined> {
    within(fn: (prevSubject: Subject) => Chainable<Subject>): Chainable<Subject>;
    within(fn: (prevSubject: Subject, extra: ExtraType) => Chainable<Subject>): Chainable<Subject, ExtraType>;
}

type ChainableWithSecondType = Chainable<string, string>;
type Merged = ChainableWithSecondType['within'];
type Ordinary = ChainableLike<string, string>['within'];

declare let m: Merged;
m((p: string) => null!);
m((p: string, e: string) => null!);
m((p) => null!);
m((p, e) => null!);

declare let o: Ordinary;
o((p: string) => null!);
o((p: string, e: string) => null!);
o((p) => null!);
o((p, e) => null!);


//// [mergeTwoInterfaces3.js]
m(function (p) { return null; });
m(function (p, e) { return null; });
m(function (p) { return null; });
m(function (p, e) { return null; });
o(function (p) { return null; });
o(function (p, e) { return null; });
o(function (p) { return null; });
o(function (p, e) { return null; });
