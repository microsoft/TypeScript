//// [overloadErrorMatchesImplementationElaboaration.ts]
class EventAggregator
{
    publish(event: string, data?: any): void;
    publish<T>(event: T): void {}
}

var ea: EventAggregator;
ea.publish([1,2,3]);

//// [overloadErrorMatchesImplementationElaboaration.js]
var EventAggregator = /** @class */ (function () {
    function EventAggregator() {
    }
    EventAggregator.prototype.publish = function (event) { };
    return EventAggregator;
}());
var ea;
ea.publish([1, 2, 3]);
