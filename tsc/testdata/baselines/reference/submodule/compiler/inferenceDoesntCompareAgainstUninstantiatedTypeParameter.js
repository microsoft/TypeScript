//// [tests/cases/compiler/inferenceDoesntCompareAgainstUninstantiatedTypeParameter.ts] ////

//// [inferenceDoesntCompareAgainstUninstantiatedTypeParameter.ts]
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

//// [inferenceDoesntCompareAgainstUninstantiatedTypeParameter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClassA {
    entity;
    settings;
    constructor(entity, settings) {
        this.entity = entity;
        this.settings = settings;
    }
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
var thisIsOk = new ClassA(new ConcreteClass(), {
    values: o => [
        {
            value: o.theName,
            func: x => 'asdfkjhgfdfghjkjhgfdfghjklkjhgfdfghjklkjhgfghj'
        }
    ]
});
