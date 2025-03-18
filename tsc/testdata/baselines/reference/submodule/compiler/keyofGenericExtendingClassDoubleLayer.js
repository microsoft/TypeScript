//// [tests/cases/compiler/keyofGenericExtendingClassDoubleLayer.ts] ////

//// [keyofGenericExtendingClassDoubleLayer.ts]
class Model<Attributes = any> {
    public createdAt: Date;
}

type ModelAttributes<T> = Omit<T, keyof Model>;

class AutoModel<T> extends Model<ModelAttributes<T>> {}

class PersonModel extends AutoModel<PersonModel> {
    public age: number;

    toJson() {
        let x: keyof this = 'createdAt';
    }
}


//// [keyofGenericExtendingClassDoubleLayer.js]
class Model {
    createdAt;
}
class AutoModel extends Model {
}
class PersonModel extends AutoModel {
    age;
    toJson() {
        let x = 'createdAt';
    }
}
