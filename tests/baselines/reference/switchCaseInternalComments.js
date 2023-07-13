//// [tests/cases/compiler/switchCaseInternalComments.ts] ////

//// [switchCaseInternalComments.ts]
/*-1*/ foo /*0*/ : /*1*/ switch /*2*/ ( /*3*/ false /*4*/ ) /*5*/ {
    /*6*/ case /*7*/ false /*8*/ : /*9*/
        /*10*/ break /*11*/ foo /*12*/;
    /*13*/ default /*14*/ : /*15*/
    /*16*/ case /*17*/ false /*18*/ : /*19*/ { /*20*/
    /*21*/ } /*22*/
}

//// [switchCaseInternalComments.js]
/*-1*/ foo /*0*/: /*1*/ switch /*2*/ ( /*3*/false /*4*/) /*5*/ {
    /*6*/ case /*7*/ false /*8*/: /*9*/
        /*10*/ break /*11*/ foo /*12*/;
    /*13*/ default /*14*/: /*15*/
    /*16*/ case /*17*/ false /*18*/: /*19*/ { /*20*/
        /*21*/ } /*22*/
}
