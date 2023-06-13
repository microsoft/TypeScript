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
var ClassA = /** @class */ (function () {
    function ClassA(entity, settings) {
        this.entity = entity;
        this.settings = settings;
    }
    return ClassA;
}());
var ConcreteClass = /** @class */ (function () {
    function ConcreteClass() {
        this.theName = 'myClass';
    }
    return ConcreteClass;
}());
var thisGetsTheFalseError = new ClassA(new ConcreteClass(), {
    values: function (o) { return [
        {
            value: o.theName,
            func: function (x) { return 'asdfkjhgfdfghjkjhgfdfghjklkjhgfdfghjklkjhgfghj'; }
        }
    ]; }
});
var thisIsOk = new ClassA(new ConcreteClass(), {
    values: function (o) { return [
        {
            value: o.theName,
            func: function (x) { return 'asdfkjhgfdfghjkjhgfdfghjklkjhgfdfghjklkjhgfghj'; }
        }
    ]; }
});
