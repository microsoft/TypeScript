// @strict: true
interface Person {
    residence: House;
}

interface House {
    isHouseOfPain: boolean;
}

declare let home: House;
declare let person: Person; 

home = person.residence.isHouseOfPain; 

declare function fnHouse(home: House): void;
fnHouse(person.residence.isHouseOfPain) // Suggest person.residence
fnHouse((person.residence).isHouseOfPain) // Suggest person.residence
fnHouse(person["residence"].isHouseOfPain) // No suggestion here only suggest on dotted access

enum W { A, B, C }
let wStatic: typeof W = W.A; // Suggest W

class C {
    name: string;
    method (): C {
        let c: C = this.name; // Suggest this
        return c;
    }
}

declare function getC(): C;
let cInstance:C = getC().name // No suggestion, not a dotted name
let cInstance2:C = cInstance.name //Suggest cInstance

function g<T extends { value: string }>(o: T): T {
    return o.value; // Suggestion on type parameter
}

type U = { a: string, c: boolean } | { a: string, d: number, e: string } | { a: string }
declare let u: U;
let c1: { a: string, c: boolean } = u.a // No suggestion here parent is not compatible
if('c' in u) {
    let c2: { a: string, c: boolean } = u.a // Suggestion here, parent is compatible
}

declare const arr: number[];
const arrLength: number[] = arr.map // Suggest the array 


type WeakType = { a?: number; b?: number; }
declare let ow: { prop: { a: number }, prop2: { c: number} };

let weak: WeakType = ow.prop.a // Suggest ow.prop
let r: Record<string, number> = ow.prop.a // No suggestion if target type just has an index signature (prop and prop2 would be valid)
let r2: {c: number } & Record<string, number> = ow.prop2.c // prop2 suggested

