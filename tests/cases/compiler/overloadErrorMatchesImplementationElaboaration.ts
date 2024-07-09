class EventAggregator
{
    publish(event: string, data?: any): void;
    publish<T>(event: T): void {}
}

var ea: EventAggregator;
ea.publish([1,2,3]);