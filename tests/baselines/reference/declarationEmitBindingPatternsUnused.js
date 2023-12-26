//// [tests/cases/compiler/declarationEmitBindingPatternsUnused.ts] ////

//// [declarationEmitBindingPatternsUnused.ts]
type Named = { name: string }
function notReferenced({ name: alias }: Named) {

}
function notReferencedNestedAlias({ p: { name: alias } }: { p: Named }) {
}
function notReferencedArrayAlias([a, b, { name: alias }]: Named[]) {
}



function referencedInCode({ name: alias }: Named) {
    return alias;
}

function referencedInSignarture({ name: alias }: Named): typeof alias {
    return alias;
}

function referencedInSignartureKeyword({ function: alias }: { function: string }): typeof alias {
    return null!;
}

function referencedInInferredType({ name: alias }: Named) {
    type Named2 = { name: typeof alias }
    return null! as Named2
}

function referencedInNestedFunction({ name: alias }: Named) {
    return function(p: typeof alias) {

    }
}

function referencedNestedAlias({ p: { name: alias } }: { p: Named }): typeof alias {
	return alias;
}

function referencedArrayAlias([a, b, { name: alias }]: Named[]): typeof alias {
	return alias;
}


class NotReferencedClass {
	constructor({ name: alias }: Named) {
	}
	set x({ name: alias }: Named) {
        console.log(alias);
    }
	m({ name: alias }: Named) {
        console.log(alias);
    }
}

class ReferencedInCodeClas {
	constructor({ name: alias }: Named) {
		console.log(alias);
	}
	set x({ name: alias }: Named) {
        console.log(alias);
    }
	m({ name: alias }: Named) {
        console.log(alias);
    }
}

class ReferencedInSignartureClass {
	constructor({ name: alias }: Named, p: typeof alias) {
		console.log(alias);
	}
	set x({ name: alias }: Named & { o: typeof alias }) {
        
    }
	mReturnType({ name: alias }: Named): typeof alias {
        return null!
    }
	mRerturnTypeNested({ name: alias }: Named): NonNullable<typeof alias> {
        return null!
    }
    mParameter({ name: alias }: Named, p: typeof alias) {
        return null!
    }
}

let notReferencedFnType: ({ name: alias }: Named) => void;
let referencedInSignartureReturnTypeFnType: ({ name: alias }: Named) => typeof alias;
let referencedInSignartureParamTypeFnType: ({ name: alias }: Named, p: typeof alias) => void;

let notReferencedCtorType: new ({ name: alias }: Named) => void;
let referencedInSignartureReturnTypeCtorType: new ({ name: alias }: Named) => typeof alias;
let referencedInSignartureParamTypeCtorType: new  ({ name: alias }: Named, p: typeof alias) => void;


interface NotReferencedInterface {
	({ name: alias }: Named): void
	new ({ name: alias }: Named): void
	set x({ name: alias }: Named);
	m({ name: alias }: Named);
}

interface ReferencedInSignartureInterface {
	({ name: alias }: Named, p: typeof alias): void
	({ name: alias }: Named): typeof alias
	
	new ({ name: alias }: Named, p: typeof alias): void
	new ({ name: alias }: Named): typeof alias
	set x({ name: alias }: Named & { o: typeof alias })
	mReturnType({ name: alias }: Named): typeof alias;
	mRerturnTypeNested({ name: alias }: Named): NonNullable<typeof alias>;
    mParameter({ name: alias }: Named, p: typeof alias);
}

//// [declarationEmitBindingPatternsUnused.js]
function notReferenced({ name: alias }) {
}
function notReferencedNestedAlias({ p: { name: alias } }) {
}
function notReferencedArrayAlias([a, b, { name: alias }]) {
}
function referencedInCode({ name: alias }) {
    return alias;
}
function referencedInSignarture({ name: alias }) {
    return alias;
}
function referencedInSignartureKeyword({ function: alias }) {
    return null;
}
function referencedInInferredType({ name: alias }) {
    return null;
}
function referencedInNestedFunction({ name: alias }) {
    return function (p) {
    };
}
function referencedNestedAlias({ p: { name: alias } }) {
    return alias;
}
function referencedArrayAlias([a, b, { name: alias }]) {
    return alias;
}
class NotReferencedClass {
    constructor({ name: alias }) {
    }
    set x({ name: alias }) {
        console.log(alias);
    }
    m({ name: alias }) {
        console.log(alias);
    }
}
class ReferencedInCodeClas {
    constructor({ name: alias }) {
        console.log(alias);
    }
    set x({ name: alias }) {
        console.log(alias);
    }
    m({ name: alias }) {
        console.log(alias);
    }
}
class ReferencedInSignartureClass {
    constructor({ name: alias }, p) {
        console.log(alias);
    }
    set x({ name: alias }) {
    }
    mReturnType({ name: alias }) {
        return null;
    }
    mRerturnTypeNested({ name: alias }) {
        return null;
    }
    mParameter({ name: alias }, p) {
        return null;
    }
}
let notReferencedFnType;
let referencedInSignartureReturnTypeFnType;
let referencedInSignartureParamTypeFnType;
let notReferencedCtorType;
let referencedInSignartureReturnTypeCtorType;
let referencedInSignartureParamTypeCtorType;


//// [declarationEmitBindingPatternsUnused.d.ts]
type Named = {
    name: string;
};
declare function notReferenced({ name }: Named): void;
declare function notReferencedNestedAlias({ p: { name } }: {
    p: Named;
}): void;
declare function notReferencedArrayAlias([a, b, { name }]: Named[]): void;
declare function referencedInCode({ name }: Named): string;
declare function referencedInSignarture({ name: alias }: Named): typeof alias;
declare function referencedInSignartureKeyword({ function: alias }: {
    function: string;
}): typeof alias;
declare function referencedInInferredType({ name: alias }: Named): {
    name: typeof alias;
};
declare function referencedInNestedFunction({ name: alias }: Named): (p: typeof alias) => void;
declare function referencedNestedAlias({ p: { name: alias } }: {
    p: Named;
}): typeof alias;
declare function referencedArrayAlias([a, b, { name: alias }]: Named[]): typeof alias;
declare class NotReferencedClass {
    constructor({ name }: Named);
    set x({ name }: Named);
    m({ name }: Named): void;
}
declare class ReferencedInCodeClas {
    constructor({ name }: Named);
    set x({ name }: Named);
    m({ name }: Named): void;
}
declare class ReferencedInSignartureClass {
    constructor({ name: alias }: Named, p: typeof alias);
    set x({ name: alias }: Named & {
        o: typeof alias;
    });
    mReturnType({ name: alias }: Named): typeof alias;
    mRerturnTypeNested({ name: alias }: Named): NonNullable<typeof alias>;
    mParameter({ name: alias }: Named, p: typeof alias): any;
}
declare let notReferencedFnType: ({ name }: Named) => void;
declare let referencedInSignartureReturnTypeFnType: ({ name: alias }: Named) => typeof alias;
declare let referencedInSignartureParamTypeFnType: ({ name: alias }: Named, p: typeof alias) => void;
declare let notReferencedCtorType: new ({ name }: Named) => void;
declare let referencedInSignartureReturnTypeCtorType: new ({ name: alias }: Named) => typeof alias;
declare let referencedInSignartureParamTypeCtorType: new ({ name: alias }: Named, p: typeof alias) => void;
interface NotReferencedInterface {
    ({ name }: Named): void;
    new ({ name }: Named): void;
    set x({ name }: Named);
    m({ name }: Named): any;
}
interface ReferencedInSignartureInterface {
    ({ name: alias }: Named, p: typeof alias): void;
    ({ name: alias }: Named): typeof alias;
    new ({ name: alias }: Named, p: typeof alias): void;
    new ({ name: alias }: Named): typeof alias;
    set x({ name: alias }: Named & {
        o: typeof alias;
    });
    mReturnType({ name: alias }: Named): typeof alias;
    mRerturnTypeNested({ name: alias }: Named): NonNullable<typeof alias>;
    mParameter({ name: alias }: Named, p: typeof alias): any;
}
