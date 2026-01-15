class EventAggregator
{
    publish(event: string, data?: any): void;
    publish<T>(event: T): void {}
}

declare var ea: EventAggregator;
ea.publish([1,2,3]);