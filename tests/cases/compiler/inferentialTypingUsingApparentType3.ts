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