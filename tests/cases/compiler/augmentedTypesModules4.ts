// module then enum
// should be errors
namespace m4 { }
enum m4 { }

namespace m4a { var y = 2; }
enum m4a { One }

namespace m4b { export var y = 2; }
enum m4b { One }

namespace m4c { interface I { foo(): void } }
enum m4c { One }

namespace m4d { class C { foo() { } } }
enum m4d { One }

//// module then module

namespace m5 { export var y = 2; }
namespace m5 { export interface I { foo(): void } } // should already be reasonably well covered
