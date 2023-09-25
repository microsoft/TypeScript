//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-commentPreservation.ts] ////

//// [esDecorators-classExpression-commentPreservation.ts]
declare var dec: any;

/*1*/
(
/*2*/
@dec
/*3*/
@dec
/*4*/
class C {
    /*5*/
    @dec
    /*6*/
    @dec
    /*7*/
    method() {}

    /*8*/
    @dec
    /*9*/
    @dec
    /*10*/
    get x() { return 1; }

    /*11*/
    @dec
    /*12*/
    @dec
    /*13*/
    set x(value: number) { }

    /*14*/
    @dec
    /*15*/
    @dec
    /*16*/
    y = 1;

    /*17*/
    @dec
    /*18*/
    @dec
    /*19*/
    accessor z = 1;

    /*20*/
    @dec
    /*21*/
    @dec
    /*22*/
    static #method() {}

    /*23*/
    @dec
    /*24*/
    @dec
    /*25*/
    static get #x() { return 1; }

    /*26*/
    @dec
    /*27*/
    @dec
    /*28*/
    static set #x(value: number) { }

    /*29*/
    @dec
    /*30*/
    @dec
    /*31*/
    static #y = 1;

    /*32*/
    @dec
    /*33*/
    @dec
    /*34*/
    static accessor #z = 1;
}
);


//// [esDecorators-classExpression-commentPreservation.js]
/*1*/
(
/*2*/
@dec
/*3*/
@dec
/*4*/
class C {
    /*5*/
    @dec
    /*6*/
    @dec
    /*7*/
    method() { }
    /*8*/
    @dec
    /*9*/
    @dec
    /*10*/
    get x() { return 1; }
    /*11*/
    @dec
    /*12*/
    @dec
    /*13*/
    set x(value) { }
    /*14*/
    @dec
    /*15*/
    @dec
    /*16*/
    y = 1;
    /*17*/
    @dec
    /*18*/
    @dec
    /*19*/
    accessor z = 1;
    /*20*/
    @dec
    /*21*/
    @dec
    /*22*/
    static #method() { }
    /*23*/
    @dec
    /*24*/
    @dec
    /*25*/
    static get #x() { return 1; }
    /*26*/
    @dec
    /*27*/
    @dec
    /*28*/
    static set #x(value) { }
    /*29*/
    @dec
    /*30*/
    @dec
    /*31*/
    static #y = 1;
    /*32*/
    @dec
    /*33*/
    @dec
    /*34*/
    static accessor #z = 1;
});
