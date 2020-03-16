interface N {
    (): boolean
    num: 123;
}
export const interfaced: N = () => true;
interfaced.num = 123;

export const inlined: { (): boolean; nun: 456 } = () => true;
inlined.nun = 456;

export const ignoreJsdoc = () => true;
/** @type {string} make sure to ignore jsdoc! */
ignoreJsdoc.extra = 111
