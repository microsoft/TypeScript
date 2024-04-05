// @strict: true
// @noEmit: true

type A = { type: "A" };
type B = { type: "B" };
type C = { type: "C" };
type MyUnion = A | B | C;

const isA = (x: MyUnion): x is A => x.type === "A";

function test1(x: MyUnion) {
    if (isA(x) !== true) {
        x;
    }

    if (isA(x) !== false) {
        x;
    }

    if (isA(x) === false) {
        x;
    }

    if (isA(x) === true) {
        x;
    }

    if (isA(x) != true) {
        x;
    }

    if (isA(x) == true) {
        x;
    }

    if (true !== isA(x)) {
        x;
    }

    if (true === isA(x)) {
        x;
    }
}

// https://github.com/microsoft/TypeScript/issues/53093
function test2(x: unknown) {
    if (x instanceof Error === false) {
        return;
    }
    x;
}

// https://github.com/microsoft/TypeScript/issues/50712
function test3(foo: unknown) {
    if (typeof foo !== 'string' && Array.isArray(foo) === false) {
        throw new Error('Not a string or an array');
    }
    foo;
}

// https://github.com/microsoft/TypeScript/issues/55395
class WebError extends URIError {
    status?: number;
}
function test4() {
    try {
        // make a request
    } catch (err) {
        if (err instanceof WebError === false || err.status != 401) {
            console.error(err);
        }
    }
}

// https://github.com/microsoft/TypeScript/issues/44366
interface Entity {
    type: string;
}
const ACTOR_TYPE = "actor";
interface Actor extends Entity {
    type: typeof ACTOR_TYPE;
}
function isActor(entity: Entity): entity is Actor {
    return entity.type === ACTOR_TYPE;
}
function test5(bin: Entity) {
    if (isActor(bin) === false) {
        bin;
    } else {
        bin;
    }
}
function test6(bin: Entity) {
    if (isActor(bin) == false) {
        bin;
    } else {
        bin;
    }
}

// https://github.com/microsoft/TypeScript/issues/53005
function isFunction(x: unknown): x is Function {
    return typeof x === "function";
}

function test7(x: unknown) {
    if (isFunction(x) !== false) {
        x;
    }
    if (isFunction(x) === true) {
        x;
    }
}
