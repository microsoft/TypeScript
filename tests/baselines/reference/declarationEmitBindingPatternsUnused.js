//// [tests/cases/compiler/declarationEmitBindingPatternsUnused.ts] ////

//// [declarationEmitBindingPatternsUnused.ts]
function shouldNotKeep({ name: alias }: { name: string }) {

}

function shouldNotKeepButIsKept({ name: alias }: { name: string }) {
    return alias;
}

function shouldKeep({ name: alias }: { name: string }): typeof alias {
    return alias;
}


//// [declarationEmitBindingPatternsUnused.js]
function shouldNotKeep({ name: alias }) {
}
function shouldNotKeepButIsKept({ name: alias }) {
    return alias;
}
function shouldKeep({ name: alias }) {
    return alias;
}


//// [declarationEmitBindingPatternsUnused.d.ts]
declare function shouldNotKeep({ name }: {
    name: string;
}): void;
declare function shouldNotKeepButIsKept({ name: alias }: {
    name: string;
}): string;
declare function shouldKeep({ name: alias }: {
    name: string;
}): typeof alias;
