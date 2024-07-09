class ClassA<TEntityClass>  {
    constructor(private entity?: TEntityClass, public settings?: SettingsInterface<TEntityClass>) {

    }
}
export interface ValueInterface<TValueClass> {
    func?: (row: TValueClass) => any;
    value?: string;
}
export interface SettingsInterface<TClass> {
    values?: (row: TClass) => ValueInterface<TClass>[],
}
class ConcreteClass {
    theName = 'myClass';
}

var thisGetsTheFalseError = new ClassA(new ConcreteClass(), {
    values: o => [
        {
            value: o.theName,
            func: x => 'asdfkjhgfdfghjkjhgfdfghjklkjhgfdfghjklkjhgfghj'
        }
    ]
});

var thisIsOk = new ClassA<ConcreteClass>(new ConcreteClass(), {
    values: o => [
        {
            value: o.theName,
            func: x => 'asdfkjhgfdfghjkjhgfdfghjklkjhgfdfghjklkjhgfghj'
        }
    ]
});