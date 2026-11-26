//// [tests/cases/compiler/classFieldsNamedEvaluationStaticNameMember.ts] ////

//// [classFieldsNamedEvaluationStaticNameMember.ts]
// A class that defines its own static `name` with a method or an accessor keeps that member: the class defines
// it after it is given its name, so the class must not be named explicitly after it is created.

const A = class { #p = 1; static name() { return "A.name"; } };
const B = class { static f = 1; static get name() { return "B.name"; } };

class C {
    f = class { static name() { return "f.name"; } };
}

// A static `name` field is initialized after the class is named, so it does not prevent naming.
const D = class { #p = 1; static name = "D.name"; };


//// [classFieldsNamedEvaluationStaticNameMember.js]
"use strict";
// A class that defines its own static `name` with a method or an accessor keeps that member: the class defines
// it after it is given its name, so the class must not be named explicitly after it is created.
const A = class {
    #p = 1;
    static name() { return "A.name"; }
};
const B = class {
    static f = 1;
    static get name() { return "B.name"; }
};
class C {
    f = class {
        static name() { return "f.name"; }
    };
}
// A static `name` field is initialized after the class is named, so it does not prevent naming.
const D = class {
    #p = 1;
    static name = "D.name";
};
