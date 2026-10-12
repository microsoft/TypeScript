// @declaration: true
function helper(): number { return 1; }
export function Host() {}
Host.first = 1;
Host.second = 'two';
Host.alias = helper;