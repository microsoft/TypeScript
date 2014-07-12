class Model {
    public name: string;
}

class UI {
    constructor(model: Model, foo = model.name)
    {
    }
}