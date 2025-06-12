//// [tests/cases/compiler/overloadErrorMatchesImplementationElaboaration.ts] ////

//// [overloadErrorMatchesImplementationElaboaration.ts]
class EventAggregator
{
    publish(event: string, data?: any): void;
    publish<T>(event: T): void {}
}

var ea: EventAggregator;
ea.publish([1,2,3]);

//// [overloadErrorMatchesImplementationElaboaration.js]
class EventAggregator {
    publish(event) { }
}
var ea;
ea.publish([1, 2, 3]);
