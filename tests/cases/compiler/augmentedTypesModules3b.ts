class m3b { foo() { } }
module m3b { var y = 2; }

class m3c { foo() { } }
module m3c { export var y = 2; } 

declare class m3d { foo(): void }
module m3d { export var y = 2; } 

module m3e { export var y = 2; } 
declare class m3e { foo(): void } 

declare class m3f { foo(): void }
module m3f { export interface I { foo(): void } }

declare class m3g { foo(): void }
module m3g { export class C { foo() { } } }
