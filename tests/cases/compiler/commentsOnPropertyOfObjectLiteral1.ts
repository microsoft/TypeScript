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