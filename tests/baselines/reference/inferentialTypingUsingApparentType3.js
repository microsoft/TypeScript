//// [inferentialTypingUsingApparentType3.ts]
interface Field<T> {
    clean(input: T): T
}

class CharField implements Field<string> {
    clean(input: string) {
        return "Yup";
    }
}

class NumberField implements Field<number> {
    clean(input: number) {
        return 123;
    }
}

class ObjectField<A, T extends { [name: string]: Field<any> }> {
    constructor(public fields: T) { }
}

var person = new ObjectField({
    id: new NumberField(),
    name: new CharField()
});

person.fields.id;

//// [inferentialTypingUsingApparentType3.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var CharField = (function () {
    function CharField() {
    }
    CharField.prototype.clean = function (input) {
        return "Yup";
    };
    __names(CharField.prototype, ["clean"]);
    return CharField;
}());
var NumberField = (function () {
    function NumberField() {
    }
    NumberField.prototype.clean = function (input) {
        return 123;
    };
    __names(NumberField.prototype, ["clean"]);
    return NumberField;
}());
var ObjectField = (function () {
    function ObjectField(fields) {
        this.fields = fields;
    }
    return ObjectField;
}());
var person = new ObjectField({
    id: new NumberField(),
    name: new CharField()
});
person.fields.id;
