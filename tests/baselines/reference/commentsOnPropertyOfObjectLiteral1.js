//// [tests/cases/compiler/commentsOnPropertyOfObjectLiteral1.ts] ////

//// [commentsOnPropertyOfObjectLiteral1.ts]
var resolve = {
    id: /*! @ngInject */ (details: any) => details.id,
    id1: /* c1 */ "hello",
    id2:
        /*! @ngInject */ (details: any) => details.id,
    id3:
    /*! @ngInject */
    (details: any) => details.id,
    id4:
    /*! @ngInject */
    /* C2 */
    (details: any) => details.id,
};

//// [commentsOnPropertyOfObjectLiteral1.js]
var resolve = {
    id: /*! @ngInject */ function (details) { return details.id; },
    id1: /* c1 */ "hello",
    id2: 
    /*! @ngInject */ function (details) { return details.id; },
    id3: 
    /*! @ngInject */
    function (details) { return details.id; },
    id4: 
    /*! @ngInject */
    /* C2 */
    function (details) { return details.id; },
};
