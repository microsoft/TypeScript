type NamedAndAnonymous = [a: string, number];

function fa1(...args: NamedAndAnonymous) {}
function fa2(a: NamedAndAnonymous, ...args: NamedAndAnonymous) {}

type NamedAnonymousMixed = [a: string, number, c: number, NamedAndAnonymous];

function fb1(...args: NamedAnonymousMixed) {}
function fb2(a: NamedAnonymousMixed, ...args: NamedAnonymousMixed) {}
function fb3(a: NamedAnonymousMixed, ...args: NamedAnonymousMixed[3]) {}
