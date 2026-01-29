//// [tests/cases/compiler/exportAssignmentImportMergeNoCrash.ts] ////

//// [assignment.ts]
export default {
    foo: 12
};

//// [user.ts]
import Obj from "./assignment";

export const Obj = void Obj;


//// [assignment.js]
export default {
    foo: 12
};
//// [user.js]
import Obj from "./assignment";
export const Obj = void Obj;
