//// [tests/cases/compiler/lambdaArgCrash.ts] ////

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Event = /** @class */ (function () {
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
}());
var ItemSetEvent = /** @class */ (function (_super) {
    __extends(ItemSetEvent, _super);
    function ItemSetEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemSetEvent.prototype.add = function (listener) {
        _super.prototype.add.call(this, listener);
    };
    return ItemSetEvent;
}(Event));
