//// [lambdaArgCrash.ts]
class Event {

	 private _listeners: any[] = [];

	 constructor () {

		 // TODO: remove

		 this._listeners = [];

	}

	 add(listener: () => any): void {

		 /// <summary>Registers a new listener for the event.</summary>

		 /// <param name="listener">The callback function to register.</param>

		 this._listeners.push(listener);

	}

}
 
class ItemSetEvent extends Event {

	 add(listener: (items: ItemSet) => void ) {

	 	super.add(listener);

	}

}


//// [lambdaArgCrash.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Event = (function () {
    function Event() {
        // TODO: remove
        this._listeners = [];
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
