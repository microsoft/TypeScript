//// [tests/cases/compiler/isolatedDeclarationErrorsClassesExpressions.ts] ////

//// [isolatedDeclarationErrorsClassesExpressions.ts]
export const cls = class {
    foo: string = "";
}


function id<T extends new (...a: any[]) => any>(cls: T) {
    return cls;
}


export class Base {

}

export class Mix extends id(Base) {

}

export const classes = [class {}, class{}] as const

//// [isolatedDeclarationErrorsClassesExpressions.js]
export const cls = class {
    foo = "";
};
function id(cls) {
    return cls;
}
export class Base {
}
export class Mix extends id(Base) {
}
export const classes = [class {
    }, class {
    }];


//// [isolatedDeclarationErrorsClassesExpressions.d.ts]
export declare const cls: {
    new (): {
        foo: string;
    };
};
export declare class Base {
}
declare const Mix_base: typeof Base;
export declare class Mix extends Mix_base {
}
export declare const classes: readonly [{
    new (): {};
}, {
    new (): {};
}];
export {};
