// @strict: true

type A1 = { x: { a?: string } };
type B1 = { x: { b?: string } };

type C1 = { x: { c: string } };

const ab1: A1 & B1 = {} as C1;  // Error

type A2 = { a?: string };
type B2 = { b?: string };

type C2 = { c: string };

const ab2: A2 & B2 = {} as C2;  // Error

enum E { A = "A" }

let x: { nope?: any } = E.A;  // Error
let y: { nope?: any } = "A";  // Error

// Repros from #51043

type OverridesInput = {
    someProp?: 'A' | 'B'
}

const foo1: Partial<{ something: any }> & { variables: {
    overrides?: OverridesInput;
} & Partial<{
    overrides?: OverridesInput;
}>} = { variables: { overrides: false } };  // Error


interface Unrelated { _?: any }

interface VariablesA { overrides?: OverridesInput; }
interface VariablesB { overrides?: OverridesInput; }

const foo2: Unrelated & { variables: VariablesA & VariablesB } = {
    variables: {
        overrides: false  // Error
    }
};

// Simplified repro from #52252

type T1 = {
    primary: { __typename?: 'Feature' } & { colors: { light: number, dark: number } },
};

type T2 = {
    primary: { __typename?: 'Feature' } & { colors: { light: number } },
};

type Query = T1 & T2;

const response: Query = {
    primary: {
        colors: {
            light: 1,
            dark: 3,
        },
    },
};

// Repro from #53412

type BaseItem = {
    id: number;
}
type ExtendedItem = BaseItem & {
    description: string | null
};
  
type BaseValue = {
    // there are other fields
    items: BaseItem[];
}
type ExtendedValue = BaseValue & {
    // there are other fields
    items: ExtendedItem[];
}

const TEST_VALUE: ExtendedValue = {
    items: [
        {id: 1, description: null},
        {id: 2, description: 'wigglytubble'},
    ]
};
