//// [lambdaArgCrash.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = (function () {
    function Event() {
        this._listeners = [];
        // TODO: remove
        this._listeners = [];
    }
    Event.prototype.add = function (listener) {
        /// <summary>Registers a new listener for the event.</summary>
        /// <param name="listener">The callback function to register.</param>
        this._listeners.push(listener);
    };
    return Event;
})();

var ItemSetEvent = (function (_super) {
    __extends(ItemSetEvent, _super);
    function ItemSetEvent() {
        _super.apply(this, arguments);
    }
    ItemSetEvent.prototype.add = function (listener) {
        _super.prototype.add.call(this, listener);
    };
    return ItemSetEvent;
})(Event);
