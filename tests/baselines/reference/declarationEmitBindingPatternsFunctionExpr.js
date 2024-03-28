//// [tests/cases/compiler/declarationEmitBindingPatternsFunctionExpr.ts] ////

//// [declarationEmitBindingPatternsFunctionExpr.ts]
type Named = { name: string }
// Tempting to remove alias if unused 
let notReferenced = ({ name: alias }: Named) => { }

// Resons we can't remove aliases that are not used in the function signature: 

// 1.Causes duplicate identifier if we remove alias
const duplicateIndetifiers = ({ name: alias, name: alias2 }: Named) => { }
const duplicateIndetifiers2 = (name: string, { name: alias }: Named) => { }
const duplicateIndetifiers3 = ({ name: alias }: Named, { name: alias2 }: Named) => { }

let value = "";
// 2.Can change in meaning for typeof value if we remove alias
const shadowedVariable = ({ value: alias }: { value: string }): typeof value => value;

//// [declarationEmitBindingPatternsFunctionExpr.js]
// Tempting to remove alias if unused 
let notReferenced = ({ name: alias }) => { };
// Resons we can't remove aliases that are not used in the function signature: 
// 1.Causes duplicate identifier if we remove alias
const duplicateIndetifiers = ({ name: alias, name: alias2 }) => { };
const duplicateIndetifiers2 = (name, { name: alias }) => { };
const duplicateIndetifiers3 = ({ name: alias }, { name: alias2 }) => { };
let value = "";
// 2.Can change in meaning for typeof value if we remove alias
const shadowedVariable = ({ value: alias }) => value;


//// [declarationEmitBindingPatternsFunctionExpr.d.ts]
type Named = {
    name: string;
};
declare let notReferenced: ({ name: alias }: Named) => void;
declare const duplicateIndetifiers: ({ name: alias, name: alias2 }: Named) => void;
declare const duplicateIndetifiers2: (name: string, { name: alias }: Named) => void;
declare const duplicateIndetifiers3: ({ name: alias }: Named, { name: alias2 }: Named) => void;
declare let value: string;
declare const shadowedVariable: ({ value: alias }: {
    value: string;
}) => typeof value;
