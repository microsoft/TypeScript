//// [cb_nested.js]
/**
 * @callback WorksWithPeopleCallback
 * @param {Object} person
 * @param {String} person.name
 * @param {Number} [person.age]
 * @returns {void}
 */

/**
 * For each person, calls your callback.
 * @param {WorksWithPeopleCallback} callback
 * @returns {void}
 */
function eachPerson(callback) {
    callback({ name: "Empty" });
}




//// [cb_nested.d.ts]
/**
 * @callback WorksWithPeopleCallback
 * @param {Object} person
 * @param {String} person.name
 * @param {Number} [person.age]
 * @returns {void}
 */
/**
 * For each person, calls your callback.
 * @param {WorksWithPeopleCallback} callback
 * @returns {void}
 */
declare function eachPerson(callback: WorksWithPeopleCallback): void;
type WorksWithPeopleCallback = (person: 
 * @param {String} person.name
 * @param {Number} [person.age]
) => void;


//// [DtsFileErrors]


tests/cases/conformance/jsdoc/cb_nested.d.ts(14,33): error TS2300: Duplicate identifier 'person'.
tests/cases/conformance/jsdoc/cb_nested.d.ts(15,4): error TS1005: ',' expected.
tests/cases/conformance/jsdoc/cb_nested.d.ts(15,20): error TS1005: ',' expected.
tests/cases/conformance/jsdoc/cb_nested.d.ts(15,20): error TS2300: Duplicate identifier 'person'.
tests/cases/conformance/jsdoc/cb_nested.d.ts(15,26): error TS1005: ',' expected.
tests/cases/conformance/jsdoc/cb_nested.d.ts(16,2): error TS1005: ',' expected.
tests/cases/conformance/jsdoc/cb_nested.d.ts(16,20): error TS1005: ',' expected.
tests/cases/conformance/jsdoc/cb_nested.d.ts(16,21): error TS2300: Duplicate identifier 'person'.
tests/cases/conformance/jsdoc/cb_nested.d.ts(16,27): error TS1005: ',' expected.


==== tests/cases/conformance/jsdoc/cb_nested.d.ts (9 errors) ====
    /**
     * @callback WorksWithPeopleCallback
     * @param {Object} person
     * @param {String} person.name
     * @param {Number} [person.age]
     * @returns {void}
     */
    /**
     * For each person, calls your callback.
     * @param {WorksWithPeopleCallback} callback
     * @returns {void}
     */
    declare function eachPerson(callback: WorksWithPeopleCallback): void;
    type WorksWithPeopleCallback = (person: 
                                    ~~~~~~
!!! error TS2300: Duplicate identifier 'person'.
     * @param {String} person.name
       ~
!!! error TS1005: ',' expected.
                       ~~~~~~
!!! error TS1005: ',' expected.
                       ~~~~~~
!!! error TS2300: Duplicate identifier 'person'.
                             ~
!!! error TS1005: ',' expected.
     * @param {Number} [person.age]
     ~
!!! error TS1005: ',' expected.
                       ~
!!! error TS1005: ',' expected.
                        ~~~~~~
!!! error TS2300: Duplicate identifier 'person'.
                              ~
!!! error TS1005: ',' expected.
    ) => void;
    