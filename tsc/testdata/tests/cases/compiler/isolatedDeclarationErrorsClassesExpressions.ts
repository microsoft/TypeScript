// @declaration: true
// @isolatedDeclarations: true
// @declarationMap: false
// @strict: true
// @target: ESNext


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