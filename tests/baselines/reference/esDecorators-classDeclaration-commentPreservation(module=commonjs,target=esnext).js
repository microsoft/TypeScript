//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-commentPreservation.ts] ////

//// [file1.ts]
declare var dec: any;

/*1*/
@dec
/*2*/
@dec
/*3*/
class C {
    /*4*/
    @dec
    /*5*/
    @dec
    /*6*/
    method() {}

    /*7*/
    @dec
    /*8*/
    @dec
    /*9*/
    get x() { return 1; }

    /*10*/
    @dec
    /*11*/
    @dec
    /*12*/
    set x(value: number) { }

    /*13*/
    @dec
    /*14*/
    @dec
    /*15*/
    y = 1;

    /*16*/
    @dec
    /*17*/
    @dec
    /*18*/
    accessor z = 1;

    /*19*/
    @dec
    /*20*/
    @dec
    /*21*/
    static #method() {}

    /*22*/
    @dec
    /*23*/
    @dec
    /*24*/
    static get #x() { return 1; }

    /*25*/
    @dec
    /*26*/
    @dec
    /*27*/
    static set #x(value: number) { }

    /*28*/
    @dec
    /*29*/
    @dec
    /*30*/
    static #y = 1;

    /*31*/
    @dec
    /*32*/
    @dec
    /*33*/
    static accessor #z = 1;
}

//// [file2.ts]
/*34*/
@dec
/*35*/
@dec
/*36*/
export class D {
}

/*37*/
@dec
/*38*/
@dec
/*39*/
export default class E {
}

//// [file3.ts]
/*40*/
export
/*41*/
@dec
/*42*/
@dec
/*43*/
class F {
}

/*44*/
export default
/*45*/
@dec
/*46*/
@dec
/*47*/
class G {
}


//// [file1.js]
/*1*/
@dec
/*2*/
@dec
/*3*/
class C {
    /*4*/
    @dec
    /*5*/
    @dec
    /*6*/
    method() { }
    /*7*/
    @dec
    /*8*/
    @dec
    /*9*/
    get x() { return 1; }
    /*10*/
    @dec
    /*11*/
    @dec
    /*12*/
    set x(value) { }
    /*13*/
    @dec
    /*14*/
    @dec
    /*15*/
    y = 1;
    /*16*/
    @dec
    /*17*/
    @dec
    /*18*/
    accessor z = 1;
    /*19*/
    @dec
    /*20*/
    @dec
    /*21*/
    static #method() { }
    /*22*/
    @dec
    /*23*/
    @dec
    /*24*/
    static get #x() { return 1; }
    /*25*/
    @dec
    /*26*/
    @dec
    /*27*/
    static set #x(value) { }
    /*28*/
    @dec
    /*29*/
    @dec
    /*30*/
    static #y = 1;
    /*31*/
    @dec
    /*32*/
    @dec
    /*33*/
    static accessor #z = 1;
}
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.D = void 0;
/*34*/
@dec
/*35*/
@dec
/*36*/
class D {
}
exports.D = D;
/*37*/
@dec
/*38*/
@dec
/*39*/
class E {
}
exports.default = E;
//// [file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.F = void 0;
/*40*/
/*41*/
@dec
/*42*/
@dec
/*43*/
class F {
}
exports.F = F;
/*44*/
/*45*/
@dec
/*46*/
@dec
/*47*/
class G {
}
exports.default = G;
