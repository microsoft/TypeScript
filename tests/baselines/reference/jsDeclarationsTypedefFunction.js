//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsTypedefFunction.ts] ////

//// [foo.js]
/**
 * @typedef {{
 *   [id: string]: [Function, Function];
 * }} ResolveRejectMap
 */

let id = 0

/**
 * @param {ResolveRejectMap} handlers
 * @returns {Promise<any>}
 */
const send = handlers => new Promise((resolve, reject) => {
  handlers[++id] = [resolve, reject]
})

//// [foo.js]
/**
 * @typedef {{
 *   [id: string]: [Function, Function];
 * }} ResolveRejectMap
 */
let id = 0;
/**
 * @param {ResolveRejectMap} handlers
 * @returns {Promise<any>}
 */
const send = handlers => new Promise((resolve, reject) => {
    handlers[++id] = [resolve, reject];
});


//// [foo.d.ts]
/**
 * @typedef {{
 *   [id: string]: [Function, Function];
 * }} ResolveRejectMap
 */
declare let id: number;
/**
 * @param {ResolveRejectMap} handlers
 * @returns {Promise<any>}
 */
declare function send(handlers: ResolveRejectMap): Promise<any>;
type ResolveRejectMap = {
    [id: string]: [Function, Function];
};
