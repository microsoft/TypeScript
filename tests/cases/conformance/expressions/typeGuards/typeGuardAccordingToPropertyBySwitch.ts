// @strict: true

// Primitive value ---- boolean bigint number string symbol undefined function object
// ts special type ---- any, void, unknown, union, intersection

//// Property Access ---- a.b
//// Element Access ---- a["b"]

interface Boolean1 {
    key: boolean;
    b1: number;
};

interface Boolean2 {
    key: boolean;
    b2: number;
};

interface BigInt1 {
    key: bigint;
    bi1: number;
};

interface Number1 {
    key: number;
    n1: number;
};

interface String1 {
    key: string;
    st1: number;
}

interface Symbol1 {
    key: symbol;
    sy1: number;
}

interface Undefined1 {
    key: undefined;
    u1: number;
}

interface Function1 {
    key: () => void;
    f1: number;
}

interface Obejct1 {
    key: {
        notEmpty: number;
    };
    o1: number;
}

type Union1 = Boolean1 | Boolean2 | Number1;
type Union2 = Boolean1 | BigInt1 | Number1 | String1 | Symbol1 | Undefined1 | Function1 | Obejct1;

function f1_1(u: Union1) {
    switch (typeof u.key) {
        case 'boolean':
            u;    // Boolean1 | Boolean2
            break;
        case 'number':
            u;    // Number1
            break;
        default:
            u;    // never
            break;
    }
}

function f1_2(u: Union1) {
    switch (typeof u.key) {
        case 'boolean':
            u;    // Boolean1 | Boolean2
            break;
        default:
            u;    // Number1
            break;
    }
}


function f1ElementAccess_1(u: Union1) {
    if (typeof u["key"] !== 'boolean') {
        u;      // Number1
        u.n1;   // number
    }
}

// boolean bigint number string symbol undefined function object
function f2_1(u: Union2) {
    switch (typeof u.key) {
        case 'bigint':
            u;  // Bigint1
            break;
        case 'boolean':
            u;  // Boolean1
            break;
        case 'number':
            u;  // Number1
            break;
        case 'string':
            u;  // String1
            break;
        case 'symbol':
            u;  // Symbol1
            break;
        case 'undefined':
            u;  // Undefined1
            break;
        case 'function':
            u;  // Function1
            break;
        case 'object':
            u;  // Object1
            break;
    }
}

function f2_2(u: Union2) {
    switch (typeof u.key) {
        case 'bigint':
        case 'boolean':
        case 'number':
        case 'string':
            u;  // Boolean1 | Number1 | BigInt1 | String1
            break;
        case 'symbol':
        case 'undefined':
        case 'function':
        case 'object':
            u;   // Symbol1 | Undefined1 | Function1 | Obejct1
            break;
    }
}

function f2_3(u: Union2) {
    switch (typeof u.key) {
        case 'bigint':
        case 'boolean':
        case 'number':
        case 'string':
            u;  // Boolean1 | Number1 | BigInt1 | String1
            break;
        default:
            u;  // Symbol1 | Undefined1 | Function1 | Obejct1
            break;
    }
}

function f2_4(u: Union2) {
    switch (typeof u.key) {
        case 'symbol':
        case 'undefined':
        case 'function':
        case 'object':
            u;  // Symbol1 | Undefined1 | Function1 | Obejct1
            break;
        default:
            u;  // Boolean1 | BigInt1 | Number1 | String1
            break;
    }
}

interface A { x: string, y: string };
interface B { x: number, y: number };
type X = A | B;

function f3(bar: X) {
    switch (typeof bar.x) {
        case 'string':
            let y = bar.y; // string
            break;
        default:
            bar.y;
            break;
    }
}
