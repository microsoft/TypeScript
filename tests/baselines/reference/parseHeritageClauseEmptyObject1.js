//// [tests/cases/compiler/parseHeritageClauseEmptyObject1.ts] ////

//// [parseHeritageClauseEmptyObject1_1.ts]
class C1 extends {} implements X {}
//// [parseHeritageClauseEmptyObject1_2.ts]
class C2 extends {} extends X {}
//// [parseHeritageClauseEmptyObject1_3.ts]
class C3 extends {}, {}
//// [parseHeritageClauseEmptyObject1_4.ts]
class C4 extends {}! {}
//// [parseHeritageClauseEmptyObject1_5.ts]
class C5 extends {}.Foo {}
//// [parseHeritageClauseEmptyObject1_6.ts]
class C6 extends {}.Foo
//// [parseHeritageClauseEmptyObject1_7.ts]
class C7 extends {}


//// [parseHeritageClauseEmptyObject1_1.js]
"use strict";
class C1 extends {} {
}
//// [parseHeritageClauseEmptyObject1_2.js]
"use strict";
class C2 extends {} extends X {
}
//// [parseHeritageClauseEmptyObject1_3.js]
"use strict";
class C3 extends {} {
}
//// [parseHeritageClauseEmptyObject1_4.js]
"use strict";
class C4 extends {} {
}
//// [parseHeritageClauseEmptyObject1_5.js]
"use strict";
class C5 extends {}.Foo {
}
//// [parseHeritageClauseEmptyObject1_6.js]
"use strict";
class C6 extends {}.Foo {
}
//// [parseHeritageClauseEmptyObject1_7.js]
"use strict";
class C7 extends  {
}
