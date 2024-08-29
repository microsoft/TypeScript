// @declaration: true
// @target: esnext
// @skipLibCheck: false

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