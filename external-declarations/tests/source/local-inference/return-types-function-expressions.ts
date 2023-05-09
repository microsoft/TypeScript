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
