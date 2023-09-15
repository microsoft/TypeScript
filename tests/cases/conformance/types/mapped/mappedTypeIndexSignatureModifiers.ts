// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/14295

interface Obj1 {
    readonly [key: string]: string;
}
type Res1 = Pick<Obj1, keyof Obj1>

interface Obj2 {
    concreteProp: 'hello';
    readonly [key: string]: string;
}
type Res2 = Pick<Obj2, keyof Obj2>

interface Obj3 {
    readonly [key: string]: string;
    readonly [key: number]: 'foo';
}
type Res3 = Pick<Obj3, keyof Obj3>

interface Obj4 {
    [key: string]: string;
    readonly [key: number]: 'foo';
}
type Res4 = Pick<Obj4, keyof Obj4>

interface Obj5 {
    readonly [key: string]: string;
    [key: number]: 'foo';
}
type Res5 = Pick<Obj5, keyof Obj5>

type Identity<T> = { [P in keyof T]: T[P]; }

interface Obj6 {
    readonly [key: `wow${string}`]: 'foo';
}
type Res6 = Identity<Obj6>

interface Obj7 {
    [key: string]: string;
    readonly [key: `wow${string}`]: 'foo';
}
type Res7 = Identity<Obj7>

interface Obj8 {
    readonly [key: string]: string;
    [key: `wow${string}`]: 'foo';
}
type Res8 = Identity<Obj8>

type StrippingPick<T, K extends keyof T> = { -readonly [P in K]: T[P]; }

interface Obj9 {
    readonly [key: string]: string;
}
type Res9 = StrippingPick<Obj9, keyof Obj9>

interface Obj10 {
    readonly [key: string]: string;
    readonly [key: number]: 'foo';
}
type Res10 = StrippingPick<Obj10, keyof Obj10>

interface Obj11 {
    [key: string]: string;
    readonly [key: number]: 'foo';
}
type Res11 = StrippingPick<Obj11, keyof Obj11>

interface Obj12 {
    readonly [key: string]: string;
    [key: number]: 'foo';
}
type Res12 = StrippingPick<Obj12, keyof Obj12>

type StrippingIdentity<T> = { -readonly [P in keyof T]: T[P]; }

interface Obj13 {
    readonly [key: `wow${string}`]: 'foo';
}
type Res13 = StrippingIdentity<Obj13>
