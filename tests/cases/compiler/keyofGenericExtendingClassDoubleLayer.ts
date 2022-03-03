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
