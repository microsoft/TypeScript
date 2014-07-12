class Model {
    public name: string;
}

class UI {
    constructor(model: Model, foo:string = model.name)
    {
    }
}