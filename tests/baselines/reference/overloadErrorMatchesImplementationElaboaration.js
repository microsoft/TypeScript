//// [tests/cases/compiler/overloadErrorMatchesImplementationElaboaration.ts] ////

//// [overloadErrorMatchesImplementationElaboaration.ts]
class EventAggregator
{
    publish(event: string, data?: any): void;
    publish<T>(event: T): void {}
}

declare var ea: EventAggregator;
ea.publish([1,2,3]);

//// [overloadErrorMatchesImplementationElaboaration.js]
var EventAggregator = /** @class */ (function () {
    function EventAggregator() {
    }
    EventAggregator.prototype.publish = function (event) { };
    return EventAggregator;
}());
ea.publish([1, 2, 3]);
