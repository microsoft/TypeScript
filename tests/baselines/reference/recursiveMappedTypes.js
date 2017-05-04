//// [recursiveMappedTypes.ts]
// Recursive mapped types simply appear empty

type Recurse = {
    [K in keyof Recurse]: Recurse[K]
}

type Recurse1 = {
    [K in keyof Recurse2]: Recurse2[K]
}

type Recurse2 = {
    [K in keyof Recurse1]: Recurse1[K]
}

//// [recursiveMappedTypes.js]
// Recursive mapped types simply appear empty


//// [recursiveMappedTypes.d.ts]
declare type Recurse = {
    [K in keyof Recurse]: Recurse[K];
};
declare type Recurse1 = {
    [K in keyof Recurse2]: Recurse2[K];
};
declare type Recurse2 = {
    [K in keyof Recurse1]: Recurse1[K];
};
