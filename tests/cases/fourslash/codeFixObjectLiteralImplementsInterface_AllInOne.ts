/// <reference path='fourslash.ts' />

//// class Building{}
//// class Box<T>{method(a:T): void{a;}}
//// enum Direction { Up, Down, Right, Left }
//// interface Z { z: boolean; }
//// interface X { x: string; }
//// interface A { o: Z; }
//// interface B { o: X; }
//// interface Basic{
////     B_varchar: string,
////     B_numero: number,
////     B_falsch: boolean,
////     B_anything: any,
////     B_array: string[],
////     B_nullo: null,
////     B_nullable?: string,
//// }
//// interface Basic{
////     B_methodo(a:string, b:number): never,
////     B_lamma: (c: number, d: boolean) => void,
////     B_clazz: Building,
////     B_nested: { a: { b: string }},
////     B_nurObjekte: object,
////     B_objo: Object,
////     B_enumo: Direction,
//// }
//// interface Advanced{
////     Ad_intersection: Z & X,
////     Ad_union: number | string,
//// }
//// interface Tuple {
////     T_basics: [string, number, any, boolean, object, string[], null],
////     T_clazz: [Building],
////     T_objectLiteral: [{a: number}],
////     T_bigNumero: [Number],
////     T_inside: [number, [number, [[string, boolean]]]],
////     T_fn: [()=>string],
////     T_intersection: [ Z & X],
////     T_union: [ boolean | number],
////     T_alias: [Intersection],
//// }
//// type Intersection = A & B;
//// type Union = A | B;
//// type ArrowFn = (a: string) => boolean;
//// type ObjLit = {a: number};
//// interface Alias {
////     A_intersection: Intersection,
////     A_union: Union,
////     A_arrowFn: ArrowFn,
////     A_objLiteral: ObjLit,
//// }
//// interface Generic {
////     G_clazz: Box<Building>,
////     G_Arrow: <T>(a: T) => boolean,
////     G_Fn<E>(a: E, b: E): void
//// }
//// interface Foo extends Basic, Advanced, Tuple, Alias, Generic {}
//// let bar: Foo = {}

verify.codeFix({
    description: "Implement interface 'Foo'",
    newFileContent:
`class Building{}
class Box<T>{method(a:T): void{a;}}
enum Direction { Up, Down, Right, Left }
interface Z { z: boolean; }
interface X { x: string; }
interface A { o: Z; }
interface B { o: X; }
interface Basic{
    B_varchar: string,
    B_numero: number,
    B_falsch: boolean,
    B_anything: any,
    B_array: string[],
    B_nullo: null,
    B_nullable?: string,
}
interface Basic{
    B_methodo(a:string, b:number): never,
    B_lamma: (c: number, d: boolean) => void,
    B_clazz: Building,
    B_nested: { a: { b: string }},
    B_nurObjekte: object,
    B_objo: Object,
    B_enumo: Direction,
}
interface Advanced{
    Ad_intersection: Z & X,
    Ad_union: number | string,
}
interface Tuple {
    T_basics: [string, number, any, boolean, object, string[], null],
    T_clazz: [Building],
    T_objectLiteral: [{a: number}],
    T_bigNumero: [Number],
    T_inside: [number, [number, [[string, boolean]]]],
    T_fn: [()=>string],
    T_intersection: [ Z & X],
    T_union: [ boolean | number],
    T_alias: [Intersection],
}
type Intersection = A & B;
type Union = A | B;
type ArrowFn = (a: string) => boolean;
type ObjLit = {a: number};
interface Alias {
    A_intersection: Intersection,
    A_union: Union,
    A_arrowFn: ArrowFn,
    A_objLiteral: ObjLit,
}
interface Generic {
    G_clazz: Box<Building>,
    G_Arrow: <T>(a: T) => boolean,
    G_Fn<E>(a: E, b: E): void
}
interface Foo extends Basic, Advanced, Tuple, Alias, Generic {}
let bar: Foo = {
    B_varchar: "",
    B_numero: 0,
    B_falsch: false,
    B_anything: "any",
    B_array: [],
    B_nullo: null,
    B_methodo: (a: string, b: number): never => {
        throw new Error("Function not implemented.");
    },
    B_lamma: (c: number, d: boolean): void => {
        throw new Error("Function not implemented.");
    },
    B_clazz: new Building(),
    B_nested: {
        a: {
            b: ""
        }
    },
    B_nurObjekte: new Object("anyObject"),
    B_objo: new Object(),
    B_enumo: Direction.Up,
    Ad_intersection: {
        z: false,
        x: ""
    },
    Ad_union: "",
    T_basics: ["", 0, "any", false, new Object("anyObject"), [], null],
    T_clazz: [new Building()],
    T_objectLiteral: [{
        a: 0
    }],
    T_bigNumero: [new Number()],
    T_inside: [0, [0, [["", false]]]],
    T_fn: [(): string => {
        throw new Error("Function not implemented.");
    } ],
    T_intersection: [{
        z: false,
        x: ""
    }],
    T_union: [0],
    T_alias: [{
        o: {
            z: false,
            x: ""
        }
    }],
    A_intersection: {
        o: {
            z: false,
            x: ""
        }
    },
    A_union: {
        o: {
            z: false
        }
    },
    A_arrowFn: (a: string): boolean => {
        throw new Error("Function not implemented.");
    },
    A_objLiteral: {
        a: 0
    },
    G_clazz: new Box<Building>(),
    G_Arrow: <T>(a: T): boolean => {
        throw new Error("Function not implemented.");
    },
    G_Fn: <E>(a: E, b: E): void => {
        throw new Error("Function not implemented.");
    },
}`,
});
