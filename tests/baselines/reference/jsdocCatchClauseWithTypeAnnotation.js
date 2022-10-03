//// [foo.js]
/**
 * @typedef {any} Any
 */

/**
 * @typedef {unknown} Unknown
 */

function fn() {
    try { } catch (x) { }                                            // should be OK
    try { } catch (/** @type {any} */ err) { }                       // should be OK
    try { } catch (/** @type {Any} */ err) { }                       // should be OK
    try { } catch (/** @type {unknown} */ err) { }                   // should be OK
    try { } catch (/** @type {Unknown} */ err) { }                   // should be OK
    try { } catch (err) { err.foo; }                                 // should be OK
    try { } catch (/** @type {any} */ err) { err.foo; }              // should be OK
    try { } catch (/** @type {Any} */ err) { err.foo; }              // should be OK
    try { } catch (/** @type {unknown} */ err) { console.log(err); } // should be OK
    try { } catch (/** @type {Unknown} */ err) { console.log(err); } // should be OK
    try { } catch (/** @type {unknown} */ err) { err.foo; }          // error in the body
    try { } catch (/** @type {Unknown} */ err) { err.foo; }          // error in the body
    try { } catch (/** @type {Error} */ err) { }                     // error in the type
    try { } catch (/** @type {object} */ err) { }                    // error in the type

    try { console.log(); }
    // @ts-ignore
    catch (/** @type {number} */ err) { // e should not be a `number`
        console.log(err.toLowerCase());
    }

	// minor bug: shows that the `catch` argument is skipped when checking scope
	try { }
	catch (err) {
		/** @type {string} */
		let err;
	}
	try { }
	catch (err) {
		/** @type {boolean} */
		var err;
	}

    try { } catch ({ x }) { }                                        // should be OK
    try { } catch (/** @type {any} */ { x }) { x.foo; }              // should be OK
    try { } catch (/** @type {Any} */ { x }) { x.foo;}               // should be OK
    try { } catch (/** @type {unknown} */ { x }) { console.log(x); } // should be OK
    try { } catch (/** @type {Unknown} */ { x }) { console.log(x); } // should be OK
    try { } catch (/** @type {Error} */ { x }) { }                   // error in the type
    try { } catch (/** @type {object} */ { x }) { }                  // error in the type
}


//// [foo.js]
/**
 * @typedef {any} Any
 */
/**
 * @typedef {unknown} Unknown
 */
function fn() {
    try { }
    catch (x) { } // should be OK
    try { }
    catch ( /** @type {any} */err) { } // should be OK
    try { }
    catch ( /** @type {Any} */err) { } // should be OK
    try { }
    catch ( /** @type {unknown} */err) { } // should be OK
    try { }
    catch ( /** @type {Unknown} */err) { } // should be OK
    try { }
    catch (err) {
        err.foo;
    } // should be OK
    try { }
    catch ( /** @type {any} */err) {
        err.foo;
    } // should be OK
    try { }
    catch ( /** @type {Any} */err) {
        err.foo;
    } // should be OK
    try { }
    catch ( /** @type {unknown} */err) {
        console.log(err);
    } // should be OK
    try { }
    catch ( /** @type {Unknown} */err) {
        console.log(err);
    } // should be OK
    try { }
    catch ( /** @type {unknown} */err) {
        err.foo;
    } // error in the body
    try { }
    catch ( /** @type {Unknown} */err) {
        err.foo;
    } // error in the body
    try { }
    catch ( /** @type {Error} */err) { } // error in the type
    try { }
    catch ( /** @type {object} */err) { } // error in the type
    try {
        console.log();
    }
    // @ts-ignore
    catch ( /** @type {number} */err) { // e should not be a `number`
        console.log(err.toLowerCase());
    }
    // minor bug: shows that the `catch` argument is skipped when checking scope
    try { }
    catch (err) {
        /** @type {string} */
        let err;
    }
    try { }
    catch (err) {
        /** @type {boolean} */
        var err;
    }
    try { }
    catch ({ x }) { } // should be OK
    try { }
    catch ( /** @type {any} */{ x }) {
        x.foo;
    } // should be OK
    try { }
    catch ( /** @type {Any} */{ x }) {
        x.foo;
    } // should be OK
    try { }
    catch ( /** @type {unknown} */{ x }) {
        console.log(x);
    } // should be OK
    try { }
    catch ( /** @type {Unknown} */{ x }) {
        console.log(x);
    } // should be OK
    try { }
    catch ( /** @type {Error} */{ x }) { } // error in the type
    try { }
    catch ( /** @type {object} */{ x }) { } // error in the type
}
