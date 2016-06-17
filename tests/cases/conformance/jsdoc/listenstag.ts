// @allowJs: true
// @filename: listenstag.js
// @out: dummy101.js
/** @module myModule */

/** An event (has listeners).
 * @event MyEvent
 * @memberof module:myModule
 * @param {number} foo - asdf. */

/** A handler.
 * @listens module:myModule.MyEvent
 * @listens module:myModule~Events.event:Event2
 * @listens fakeEvent
 */
function MyHandler() {
}

/** Another handler.
 * @listens module:myModule.MyEvent
 */
function AnotherHandler() {
}

/** a namespace.
 * @namespace */
var Events = {
};

/** Another event (has listeners).
 * @event Event2
 * @memberof module:myModule~Events
 */

/** An event with no listeners.
 * @event module:myModule#Event3 */
