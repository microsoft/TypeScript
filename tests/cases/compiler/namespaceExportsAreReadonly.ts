namespace N {
    export const x = 0;

    export class C {}
    export let D = class {}

    export function f() {}
    export let g = function() {}

    export enum E {}
    enum Ff {}
    export let F = Ff;

    export namespace M { export const y = 0; }
    namespace Oo { export const y = 0; }
    export let O = Oo;
}

N.x = 1; // Error

N.C = class {}; // Error
N.D = class {}; // OK

N.f = function() {} // Error
N.g = function() {} // OK

enum Ee {}
N.E = Ee; // Error
enum Ff {}
N.F = Ff; // OK

namespace Mm { export const y = 0; }
N.M = Mm; // Error
namespace Oo { export const y = 0; }
N.O = Oo; // OK

class K {
    m() {}
}
new K().m = () => {}; // OK
