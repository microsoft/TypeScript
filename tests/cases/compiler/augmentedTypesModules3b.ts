class m3b { foo() { } }
namespace m3b { var y = 2; }

class m3c { foo() { } }
namespace m3c { export var y = 2; } 

declare class m3d { foo(): void }
namespace m3d { export var y = 2; } 

namespace m3e { export var y = 2; } 
declare class m3e { foo(): void } 

declare class m3f { foo(): void }
namespace m3f { export interface I { foo(): void } }

declare class m3g { foo(): void }
namespace m3g { export class C { foo() { } } }
