//// [a.js]
const a = () => {
    return {
        arguments: [],
    };
};

const b = () => {
    const c = {
        arguments: [],
    }
    return c;
};

const c = () => {
    return {
        arguments,
    };
}

const d = () => {
    const arguments = undefined;
    return {
        arguments,
    };
}


//// [a.js]
const a = () => {
    return {
        arguments: [],
    };
};
const b = () => {
    const c = {
        arguments: [],
    };
    return c;
};
const c = () => {
    return {
        arguments,
    };
};
const d = () => {
    const arguments = undefined;
    return {
        arguments,
    };
};
