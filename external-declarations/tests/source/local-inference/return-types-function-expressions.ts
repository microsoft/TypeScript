// @strict: false, true
// @target: es2015

export let noBody = () => 1;
export let noBodyAsync = async () => 1;

export const returnNoExpression = (...args: unknown[]) => {
    if (Math.random()) return;
};



export const returnUndefined = (...args: unknown[]) => {
    if (Math.random()) return undefined;
};

export const returnUndefinedOrNoExpr = (...args: unknown[]) => {
    if (Math.random()) return undefined;
    if (Math.random()) return;
};

export const returnNoExpression2 = (...args: unknown[]) => {
    if (Math.random()) return;
    if (Math.random()) return;
    if (Math.random()) return;
};

export const returnSomeNoExpression = (...args: unknown[]) => {
    if (Math.random()) return;
    if (Math.random()) return 2
};

export const returnsUndefinedOrPrimitive = (...args: unknown[]) => {
    if (Math.random()) return undefined;
    if (Math.random()) return 2
    return undefined;
};


export const returnsNullOrPrimitive = (...args: unknown[]) => {
    if (Math.random()) return null;
    if (Math.random()) return 2
    return null;
};


export let returnsStringParenthesized = () => {
    return ((("A")))
}

export let returnsNumber = () => {
    return 1
}

export let returnsObject = () => {
    return {
        foo: ""
    };
}

export let returnsObjectUnion = () => {
    if(Math.random() > 0) {
        return {
            foo: "",
            bar: 1,
        };
    }
    return {
        foo: ""
    };
}

export let returnsUnionPrimitive = () => {
    if(Math.random() > 0) {
        return "A";
    }
    return "B";
}


export let returnsStringFn = function () {
    return "A"
}

export let returnsNumberFn = function () {
    return 1
}

export let returnsObjectFn = function () {
    return {
        foo: ""
    };
}

export let returnsObjectUnionFn = function () {
    if(Math.random() > 0) {
        return {
            foo: "",
            bar: 1
        };
    }
    return {
        foo: ""
    };
}

export let returnsUnionPrimitiveFn = function () {
    if(Math.random() > 0) {
        return "A";
    }
    return "B";
}


export const genericFn = <T>(o: T): T => { return o as T };
export const nestedGenericFns = function <T>(o: T) {
    return <U>(p: T, v: U) => {
        return p as T;
    }
};


