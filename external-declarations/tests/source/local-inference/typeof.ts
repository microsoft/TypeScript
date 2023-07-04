// @strict: true
// @target: es2015

export let x = 1;
export let y = x;

export const EnumLike = {
    A: 1, 
    B: 2,
}

export const arr = [EnumLike.A, EnumLike.B] as const
// export const arr2: readonly [typeof EnumLike.A, typeof  EnumLike.B];


let v  = "";
export const exportedV = v;

let o = { prop: 1 };
export const exportedProp = o.prop;


let xo = {
    baz: 1,
    bar: 1
}

let yo = {
    bat: "",
    foo: ""
}

export let xyo = {
    ...yo,
    ...xo,
}

export const HappyLogLevel = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    NONE: 'NONE',
    TRACE: 'TRACE',
} as const;
export const UnhappyLogLevel = {
    ERROR: 'ERROR',
    FATAL: 'FATAL',
    WARN: 'WARN',
} as const;
export const LogLevel = {
    UNDEFINED: "UNDEFINED",
    ...HappyLogLevel,
    ...UnhappyLogLevel,
} as const;

const noteTypes = ['short', 'long'] as const;
export const getNoteTypes = () => noteTypes;

export const getSettings = (
    settings: { field: boolean }
)=> ({
   x: settings.field
});
