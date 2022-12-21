//// [ramdaToolsNoInfinite2.ts]
declare module "Any/Kind" {
    import { Extends } from "Any/Extends";
    import { List } from "List/List";

    export type Kind<A extends any> = Extends<A, Function> extends 1 ? 'function' : Extends<A, List> extends 1 ? 'array' : Extends<A, object> extends 1 ? 'object' : Extends<A, string> extends 1 ? 'string' : Extends<A, number> extends 1 ? 'number' : Extends<A, boolean> extends 1 ? 'boolean' : 'unknown';
}
declare module "Any/Compute" {
    export type Compute<A extends any> = A extends Function ? A : {
        [K in keyof A]: A[K];
    } & {};
}
declare module "Object/Pick" {
    import { Key } from "Any/Key";

    type __Pick<O extends object, K extends keyof O> = {
        [P in K]: O[P];
    } & {};

    export type _Pick<O extends object, K extends Key> = __Pick<O, keyof O & K>;

    export type Pick<O extends object, K extends Key> = O extends unknown ? _Pick<O, K & keyof O> : never;
}
declare module "Object/Keys" {
    import { Keys as UKeys } from "Union/Keys";

    export type Keys<O extends object> = UKeys<O>;
}
declare module "Object/Omit" {
    import { _Pick } from "Object/Pick";
    import { Exclude } from "Union/Exclude";
    import { Key } from "Any/Key";
    import { Keys } from "Object/Keys";
    export type _Omit<O extends object, K extends Key> = _Pick<O, Exclude<Keys<O>, K>>;

    export type Omit<O extends object, K extends Key> = O extends unknown ? _Omit<O, K> : never;
}
declare module "Object/At" {
    import { Key } from "Any/Key";
    import { Boolean } from "Boolean/Boolean";

    type AtStrict<O extends object, K extends Key> = [K & keyof O] extends [never] ? never : O[K & keyof O];

    type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;

    export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
        1: AtStrict<O, K>;
        0: AtLoose<O, K>;
    }[strict];
}
declare module "Boolean/Boolean" {
    export type Boolean = True | False;

    export type True = 1;

    export type False = 0;
}
declare module "Boolean/Not" {
    import { Boolean } from "Boolean/Boolean";

    export type Not<B extends Boolean> = {
        0: 1;
        1: 0;
    }[B];
}
declare module "Union/Has" {
    import { Union } from "Union/Union";
    import { Not } from "Boolean/Not";
    import { Extends } from "Any/Extends";

    export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
}
declare module "Union/Union" {
    export type Union = any;
}
declare module "Union/Exclude" {
    import { Union } from "Union/Union";

    export type Exclude<U extends Union, M extends Union> = U extends M ? never : U;
}
declare module "Any/_Internal" {
    import { _NumberOf } from "Number/NumberOf";

    export type Match = 'default' | 'implements->' | '<-implements' | 'extends->' | '<-extends' | 'equals';

    export type NumberOf<N extends any> = N extends number ? _NumberOf<N> : N;
}
declare module "Any/Implements" {
    import { Extends } from "Any/Extends";

    export type Implements<A1 extends any, A2 extends any> = Extends<A1, A2> extends 1 ? 1 : 0;
}
declare module "Any/Key" {
    export type Key = string | number | symbol;
}
declare module "Union/Keys" {
    import { Union } from "Union/Union";
    import { Key } from "Any/Key";

    export type Keys<U extends Union> = (U extends unknown ? keyof U : never) & Key;
}
declare module "List/ObjectOf" {
    import { _Omit } from "Object/Omit";
    import { Has } from "Union/Has";
    import { At } from "Object/At";
    import { List } from "List/List";

    export type _ObjectOf<L extends object> = Has<keyof L, keyof List> extends 1 ? number extends At<L, 'length'> ? _Omit<L, Exclude<keyof any[], number>> : _Omit<L, keyof any[]> : L;

    export type ObjectOf<L extends object> = L extends unknown ? _ObjectOf<L> : never;
}
declare module "List/Keys" {
    import { Exclude } from "Union/Exclude";
    import { List } from "List/List";
    import { Keys as UKeys } from "Union/Keys";

    export type Keys<L extends List> = Exclude<UKeys<L>, keyof any[]> | number;
}
declare module "Object/Merge" {
    import { _Omit } from "Object/Omit";
    import { At } from "Object/At";
    import { Compute } from "Any/Compute";
    import { Depth } from "Object/_Internal";
    import { Kind } from "Any/Kind";

    export type MergeFlat<O extends object, O1 extends object> = Compute<O & _Omit<O1, keyof O>>;

    export type MergeDeep<O, O1> = (Kind<(O | O1)> extends 'object' ? MergeFlat<O & {}, O1 & {}> extends infer M ? {
        [K in keyof M]: MergeDeep<M[K], At<O1 & {}, K>>;
    } & {} : never : O);

    export type Merge<O extends object, O1 extends object, depth extends Depth = 'flat'> = {
        'flat': MergeFlat<O, O1>;
        'deep': MergeDeep<O, O1>;
    }[depth];
}
declare module "Union/NonNullable" {
    import { Exclude } from "Union/Exclude";
    import { Union } from "Union/Union";

    export type NonNullable<U extends Union> = Exclude<U, undefined | null>;
}
declare module "Object/ListOf" {
    import { IterationOf } from "Iteration/IterationOf";
    import { Iteration } from "Iteration/Iteration";
    import { Cast } from "Any/Cast";
    import { Key } from "Iteration/Key";
    import { Next } from "Iteration/Next";
    import { _Append } from "List/Append";
    import { Exclude } from "Union/Exclude";
    import { List } from "List/List";
    import { Extends } from "Any/Extends";

    type PickIfEntry<O extends object, LN extends List, I extends Iteration> = Key<I> extends keyof O ? _Append<LN, O[Cast<Key<I>, keyof O>]> : LN;

    type __ListOf<O extends object, K, LN extends List = [], I extends Iteration = IterationOf<'0'>> = {
        0: __ListOf<O, Exclude<K, Key<I>>, PickIfEntry<O, LN, I>, Next<I>>;
        1: LN;
    }[Extends<[K], [never]>];

    export type _ListOf<O extends object> = __ListOf<O, keyof O> extends infer X ? Cast<X, List> : never;

    export type ListOf<O extends object> = O extends unknown ? _ListOf<O> : never;
}
declare module "Object/NonNullable" {
    import { MergeFlat } from "Object/Merge";
    import { NonNullable as UNonNullable } from "Union/NonNullable";
    import { Depth } from "Object/_Internal";
    import { Pick } from "Object/Pick";
    import { Key } from "Any/Key";
    import { Implements } from "Any/Implements";
    import { Keys } from "Object/Keys";

    export type NonNullableFlat<O> = {
        [K in keyof O]: UNonNullable<O[K]>;
    } & {};

    export type NonNullableDeep<O> = {
        [K in keyof O]: NonNullableDeep<UNonNullable<O[K]>>;
    };

    type NonNullablePart<O extends object, depth extends Depth> = {
        'flat': NonNullableFlat<O>;
        'deep': NonNullableDeep<O>;
    }[depth];

    export type NonNullable<O extends object, K extends Key = Key, depth extends Depth = 'flat'> = {
        1: NonNullablePart<O, depth>;
        0: MergeFlat<NonNullablePart<Pick<O, K>, depth>, O>;
    }[Implements<Keys<O>, K>] & {};
}
declare module "Object/Overwrite" {
    export type Overwrite<O extends object, O1 extends object> = {
        [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
    } & {};
}
declare module "Number/_Internal" {
    import { IterationMap } from "Iteration/IterationOf";
    import { Format } from "Iteration/Format";

    export type Formats = 'b' | 'n' | 's';

    type KnownIterationMapKeys = '-40' | '-39' | '-38' | '-37' | '-36' | '-35' | '-34' | '-33' | '-32' | '-31' | '-30' | '-29' | '-28' | '-27' | '-26' | '-25' | '-24' | '-23' | '-22' | '-21' | '-20' | '-19' | '-18' | '-17' | '-16' | '-15' | '-14' | '-13' | '-12' | '-11' | '-10' | '-9' | '-8' | '-7' | '-6' | '-5' | '-4' | '-3' | '-2' | '-1' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40';

    type PositiveIterationKeys = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40';

    type NegativeIterationKeys = '-40' | '-39' | '-38' | '-37' | '-36' | '-35' | '-34' | '-33' | '-32' | '-31' | '-30' | '-29' | '-28' | '-27' | '-26' | '-25' | '-24' | '-23' | '-22' | '-21' | '-20' | '-19' | '-18' | '-17' | '-16' | '-15' | '-14' | '-13' | '-12' | '-11' | '-10' | '-9' | '-8' | '-7' | '-6' | '-5' | '-4' | '-3' | '-2' | '-1';

    export type Numbers = {
        'string': {
            'all': Format<IterationMap[KnownIterationMapKeys], 's'>;
            '+': Format<IterationMap[PositiveIterationKeys], 's'>;
            '-': Format<IterationMap[NegativeIterationKeys], 's'>;
            '0': Format<IterationMap['0'], 's'>;
        };
        'number': {
            'all': Format<IterationMap[KnownIterationMapKeys], 'n'>;
            '+': Format<IterationMap[PositiveIterationKeys], 'n'>;
            '-': Format<IterationMap[NegativeIterationKeys], 'n'>;
            '0': Format<IterationMap['0'], 'n'>;
        };
    };
}
declare module "Number/Number" {
    export type Number = string;
}
declare module "Iteration/_Internal" {
    export type Formats = 'n' | 's';
    export type Way = '->' | '<-';
}
declare module "List/Prepend" {
    import { List } from "List/List";

    export type Prepend<L extends List, A extends any> = ((head: A, ...args: L) => any) extends ((...args: infer U) => any) ? U : L;
}
declare module "List/_Internal" {
    import { Overwrite } from "Object/Overwrite";
    import { List } from "List/List";

    export type Naked<L extends List> = Overwrite<Required<L>, L>;
}
declare module "List/Tail" {
    import { List } from "List/List";

    export type Tail<L extends List> = ((...t: L) => any) extends ((head: any, ...tail: infer LTail) => any) ? LTail : never;
}
declare module "Iteration/Format" {
    import { Iteration } from "Iteration/Iteration";
    import { Formats } from "Iteration/_Internal";

    export type Format<I extends Iteration, fmt extends Formats> = {
        's': I[2];
        'n': I[3];
    }[fmt];
}
declare module "Iteration/Pos" {
    import { Iteration } from "Iteration/Iteration";
    import { Format } from "Iteration/Format";

    export type Pos<I extends Iteration> = Format<I, 'n'>;
}
declare module "List/Append" {
    import { _Concat } from "List/Concat";
    import { List } from "List/List";

    export type _Append<L extends List, A extends any> = _Concat<L, [A]>;

    export type Append<L extends List, A extends any> = L extends unknown ? A extends unknown ? _Append<L, A> : never : never;
}
declare module "List/Reverse" {
    import { Prepend } from "List/Prepend";
    import { Pos } from "Iteration/Pos";
    import { Next } from "Iteration/Next";
    import { Length } from "List/Length";
    import { IterationOf } from "Iteration/IterationOf";
    import { Iteration } from "Iteration/Iteration";
    import { Cast } from "Any/Cast";
    import { List } from "List/List";
    import { Naked } from "List/_Internal";
    import { Extends } from "Any/Extends";

    type __Reverse<L extends List, LO extends List, I extends Iteration = IterationOf<'0'>> = {
        0: __Reverse<L, Prepend<LO, L[Pos<I>]>, Next<I>>;
        1: LO;
    }[Extends<Pos<I>, Length<L>>];

    export type _Reverse<L extends List, LO extends List = []> = __Reverse<Naked<L>, LO> extends infer X ? Cast<X, List> : never;

    export type Reverse<L extends List, LO extends List = []> = L extends unknown ? LO extends unknown ? _Reverse<L, LO> : never : never;
}
declare module "List/Concat" {
    import { _Reverse } from "List/Reverse";
    import { List } from "List/List";

    export type _Concat<L extends List, L1 extends List> = _Reverse<_Reverse<L>, L1>;

    export type Concat<L extends List, L1 extends List> = L extends unknown ? L1 extends L1 ? _Concat<L, L1> : never : never;
}
declare module "List/Drop" {
    import { Tail } from "List/Tail";
    import { Cast } from "Any/Cast";
    import { IterationOf } from "Iteration/IterationOf";
    import { Iteration } from "Iteration/Iteration";
    import { Number } from "Number/Number";
    import { Way } from "Iteration/_Internal";
    import { List } from "List/List";
    import { Pos } from "Iteration/Pos";
    import { Prev } from "Iteration/Prev";
    import { Prepend } from "List/Prepend";
    import { Naked } from "List/_Internal";
    import { Extends } from "Any/Extends";

    type DropForth<L extends List, N extends Iteration> = {
        0: DropForth<Tail<L>, Prev<N>>;
        1: L;
    }[Extends<0, Pos<N>>];

    type DropBack<L extends List, N extends Iteration, I extends Iteration = Prev<N>, LN extends List = []> = {
        0: DropBack<L, N, Prev<I>, Prepend<LN, L[Pos<I>]>>;
        1: LN;
    }[Extends<-1, Pos<I>>];

    type __Drop<L extends List, N extends Iteration, way extends Way = '->'> = {
        '->': DropForth<L, N>;
        '<-': DropBack<L, N>;
    }[way];

    export type _Drop<L extends List, N extends Number, way extends Way = '->'> = __Drop<Naked<L>, IterationOf<N>, way> extends infer X ? Cast<X, List> : never;

    export type Drop<L extends List, N extends Number, way extends Way = '->'> = L extends unknown ? N extends unknown ? _Drop<L, N, way> : never : never;
}
declare module "List/Length" {
    import { NumberOf } from "Number/NumberOf";
    import { Formats } from "Iteration/_Internal";
    import { List } from "List/List";

    export type Length<L extends List, fmt extends Formats = 'n'> = {
        's': NumberOf<L['length']>;
        'n': L['length'];
    }[fmt];
}
declare module "Iteration/Next" {
    import { IterationMap } from "Iteration/IterationOf";
    import { Iteration } from "Iteration/Iteration";

    export type Next<I extends Iteration> = IterationMap[I[1]];
}
declare module "Any/Cast" {
    export type Cast<A1 extends any, A2 extends any> = A1 extends A2 ? A1 : A2;
}
declare module "Function/Parameters" {
    import { Function } from "Function/Function";

    export type Parameters<F extends Function> = F extends ((...args: infer L) => any) ? L : never;
}
declare module "Function/Return" {
    import { Function } from "Function/Function";

    export type Return<F extends Function> = F extends ((...args: any[]) => infer R) ? R : never;
}
declare module "Iteration/Prev" {
    import { IterationMap } from "Iteration/IterationOf";
    import { Iteration } from "Iteration/Iteration";

    export type Prev<I extends Iteration> = IterationMap[I[0]];
}
declare module "Number/NumberOf" {
    import { IterationMap } from "Iteration/IterationOf";
    import { Key } from "Iteration/Key";
    import { Pos } from "Iteration/Pos";
    import { Numbers } from "Number/_Internal";

    export type _NumberOf<N extends number> = {
        [K in keyof IterationMap]: Pos<IterationMap[K]> extends N ? Key<IterationMap[K]> : never;
    }[keyof IterationMap];

    export type NumberOf<N extends number> = N extends Numbers['number']['all'] ? _NumberOf<N> : string;
}
declare module "Object/_Internal" {
    export type Modx = ['?' | '!', 'W' | 'R'];

    export type Depth = 'flat' | 'deep';

    export type Empty<O extends object> = {
        [K in keyof O]: undefined;
    };
}
declare module "Iteration/IterationOf" {
    import { Number } from "Number/Number";

    export type IterationMap = {
        '-40': ['__', '-39', '-40', -40, '-'];
        '-39': ['-40', '-38', '-39', -39, '-'];
        '-38': ['-39', '-37', '-38', -38, '-'];
        '-37': ['-38', '-36', '-37', -37, '-'];
        '-36': ['-37', '-35', '-36', -36, '-'];
        '-35': ['-36', '-34', '-35', -35, '-'];
        '-34': ['-35', '-33', '-34', -34, '-'];
        '-33': ['-34', '-32', '-33', -33, '-'];
        '-32': ['-33', '-31', '-32', -32, '-'];
        '-31': ['-32', '-30', '-31', -31, '-'];
        '-30': ['-31', '-29', '-30', -30, '-'];
        '-29': ['-30', '-28', '-29', -29, '-'];
        '-28': ['-29', '-27', '-28', -28, '-'];
        '-27': ['-28', '-26', '-27', -27, '-'];
        '-26': ['-27', '-25', '-26', -26, '-'];
        '-25': ['-26', '-24', '-25', -25, '-'];
        '-24': ['-25', '-23', '-24', -24, '-'];
        '-23': ['-24', '-22', '-23', -23, '-'];
        '-22': ['-23', '-21', '-22', -22, '-'];
        '-21': ['-22', '-20', '-21', -21, '-'];
        '-20': ['-21', '-19', '-20', -20, '-'];
        '-19': ['-20', '-18', '-19', -19, '-'];
        '-18': ['-19', '-17', '-18', -18, '-'];
        '-17': ['-18', '-16', '-17', -17, '-'];
        '-16': ['-17', '-15', '-16', -16, '-'];
        '-15': ['-16', '-14', '-15', -15, '-'];
        '-14': ['-15', '-13', '-14', -14, '-'];
        '-13': ['-14', '-12', '-13', -13, '-'];
        '-12': ['-13', '-11', '-12', -12, '-'];
        '-11': ['-12', '-10', '-11', -11, '-'];
        '-10': ['-11', '-9', '-10', -10, '-'];
        '-9': ['-10', '-8', '-9', -9, '-'];
        '-8': ['-9', '-7', '-8', -8, '-'];
        '-7': ['-8', '-6', '-7', -7, '-'];
        '-6': ['-7', '-5', '-6', -6, '-'];
        '-5': ['-6', '-4', '-5', -5, '-'];
        '-4': ['-5', '-3', '-4', -4, '-'];
        '-3': ['-4', '-2', '-3', -3, '-'];
        '-2': ['-3', '-1', '-2', -2, '-'];
        '-1': ['-2', '0', '-1', -1, '-'];
        '0': ['-1', '1', '0', 0, '0'];
        '1': ['0', '2', '1', 1, '+'];
        '2': ['1', '3', '2', 2, '+'];
        '3': ['2', '4', '3', 3, '+'];
        '4': ['3', '5', '4', 4, '+'];
        '5': ['4', '6', '5', 5, '+'];
        '6': ['5', '7', '6', 6, '+'];
        '7': ['6', '8', '7', 7, '+'];
        '8': ['7', '9', '8', 8, '+'];
        '9': ['8', '10', '9', 9, '+'];
        '10': ['9', '11', '10', 10, '+'];
        '11': ['10', '12', '11', 11, '+'];
        '12': ['11', '13', '12', 12, '+'];
        '13': ['12', '14', '13', 13, '+'];
        '14': ['13', '15', '14', 14, '+'];
        '15': ['14', '16', '15', 15, '+'];
        '16': ['15', '17', '16', 16, '+'];
        '17': ['16', '18', '17', 17, '+'];
        '18': ['17', '19', '18', 18, '+'];
        '19': ['18', '20', '19', 19, '+'];
        '20': ['19', '21', '20', 20, '+'];
        '21': ['20', '22', '21', 21, '+'];
        '22': ['21', '23', '22', 22, '+'];
        '23': ['22', '24', '23', 23, '+'];
        '24': ['23', '25', '24', 24, '+'];
        '25': ['24', '26', '25', 25, '+'];
        '26': ['25', '27', '26', 26, '+'];
        '27': ['26', '28', '27', 27, '+'];
        '28': ['27', '29', '28', 28, '+'];
        '29': ['28', '30', '29', 29, '+'];
        '30': ['29', '31', '30', 30, '+'];
        '31': ['30', '32', '31', 31, '+'];
        '32': ['31', '33', '32', 32, '+'];
        '33': ['32', '34', '33', 33, '+'];
        '34': ['33', '35', '34', 34, '+'];
        '35': ['34', '36', '35', 35, '+'];
        '36': ['35', '37', '36', 36, '+'];
        '37': ['36', '38', '37', 37, '+'];
        '38': ['37', '39', '38', 38, '+'];
        '39': ['38', '40', '39', 39, '+'];
        '40': ['39', '__', '40', 40, '+'];
        '__': ['__', '__', string, number, '-' | '0' | '+'];
    };

    export type IterationOf<N extends Number> = N extends keyof IterationMap ? IterationMap[N] : IterationMap['__'];
}
declare module "Iteration/Iteration" {
    import { IterationMap } from "Iteration/IterationOf";

    export type Iteration = [keyof IterationMap, keyof IterationMap, string, number, '-' | '0' | '+'];
}
declare module "Iteration/Key" {
    import { Iteration } from "Iteration/Iteration";
    import { Format } from "Iteration/Format";

    export type Key<I extends Iteration> = Format<I, 's'>;
}
declare module "List/NonNullable" {
    import { Depth } from "Object/_Internal";
    import { NonNullable as ONonNullable } from "Object/NonNullable";
    import { ListOf } from "Object/ListOf";
    import { Cast } from "Any/Cast";
    import { Key } from "Any/Key";
    import { ObjectOf } from "List/ObjectOf";
    import { Implements } from "Any/Implements";
    import { Keys } from "List/Keys";
    import { List } from "List/List";
    import { NumberOf } from "Any/_Internal";

    export type NonNullable<L extends List, K extends Key = Key, depth extends Depth = 'flat'> = {
        1: Cast<ONonNullable<L, Key, depth>, List>;
        0: ListOf<ONonNullable<ObjectOf<L>, NumberOf<K>, depth>>;
    }[Implements<Keys<L>, K>] & {};
}
declare module "Any/Type" {
    const symbol: unique symbol;

    export type Type<A extends any, Id extends string> = A & {
        [K in typeof symbol]: Id;
    };
}
declare module "Any/x" {
    import { Type } from "Any/Type";

    export type x = Type<{}, 'x'>;
}
declare module "List/List" {

    export type List<A = any> = ReadonlyArray<A>;
}
declare module "Function/Function" {
    import { List } from "List/List";

    export interface Function<P extends List = any, R extends any = any> {
        (...args: P): R;
    }
}
declare module "Any/Extends" {
    export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
}

declare module "Function/Curry" {
    import { Pos } from "Iteration/Pos";
    import { _Append } from "List/Append";
    import { _Concat } from "List/Concat";
    import { _Drop } from "List/Drop";
    import { Length } from "List/Length";
    import { Next } from "Iteration/Next";
    import { Cast } from "Any/Cast";
    import { Parameters } from "Function/Parameters";
    import { Return } from "Function/Return";
    import { IterationOf } from "Iteration/IterationOf";
    import { Iteration } from "Iteration/Iteration";
    import { Key } from "Iteration/Key";
    import { NonNullable } from "List/NonNullable";
    import { x } from "Any/x";
    import { List } from "List/List";
    import { Function } from "Function/Function";
    import { Extends } from "Any/Extends";

    type GapOf<L1 extends List, L2 extends List, LN extends List, I extends Iteration = IterationOf<'0'>> = L1[Pos<I>] extends x ? _Append<LN, L2[Pos<I>]> : LN;

    type _GapsOf<L1 extends List, L2 extends List, LN extends List = [], I extends Iteration = IterationOf<'0'>> = {
        0: _GapsOf<L1, L2, GapOf<L1, L2, LN, I>, Next<I>>;
        1: _Concat<LN, _Drop<L2, Key<I>>>;
    }[Extends<Pos<I>, Length<L1>>];

    type GapsOf<L1 extends List, L2 extends List> = _GapsOf<L1, L2> extends infer X ? Cast<X, List> : never;

    type Gaps<L extends List> = NonNullable<{
        [K in keyof L]?: L[K] | x;
    }>;

    export type Curry<F extends Function> = <L extends List>(...args: Cast<L, Gaps<Parameters<F>>>) => GapsOf<L, Parameters<F>> extends infer G ? Length<Cast<G, List>> extends infer L ? L extends 0 ? Return<F> : L extends 1 ? Curry<(...args: Cast<G, List>) => Return<F>> & ((...args: Cast<G, List>) => Return<F>) : Curry<(...args: Cast<G, List>) => Return<F>> : never : never;
}




//// [ramdaToolsNoInfinite2.js]
"use strict";
