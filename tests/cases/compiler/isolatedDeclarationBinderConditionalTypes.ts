// @declaration: true
// @target: ESNext

type TA = string;
type UA = string;
export type Conditional<UA> = UA extends infer TA ? TA: never;


type TF = string;
type UF = string;
export function test<UF>(o: UF extends infer TF ? TF: never): UF extends infer TF ? TF: never {
    return null!
}

type TC = string;
type UC = string;
export class C<UC> {
    member!: UC extends infer TC ? TC: never
    get accessor(): UC extends infer TC ? TC: never {
        return null!
    }
    set accessor(value: UC extends infer TC ? TC: never) {
        
    }
    constructor(p: UC extends infer TC ? TC: never) {
        return null!;
    }
    method(p: UC extends infer TC ? TC: never): UC extends infer TC ? TC: never {
        return null!;
    }
}

type TI = string;
type UI = string;
export interface I<UI> {
    member: UI extends infer TI ? TI: never
    method(p: UI extends infer TI ? TI: never): UI extends infer TI ? TI: never;
    new (p: UI extends infer TI ? TI: never): UI extends infer TI ? TI: never;
}



type T2 = {}
export type Prepend<Elm, T extends unknown[]> =
  T extends unknown ?
  ((arg: Elm, ...rest: T) => void) extends ((...args: infer T2) => void) ? T2 :
  never :
  never;