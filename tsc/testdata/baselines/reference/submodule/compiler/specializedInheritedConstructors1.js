//// [tests/cases/compiler/specializedInheritedConstructors1.ts] ////

//// [specializedInheritedConstructors1.ts]
interface ViewOptions<TModel> {
    model: TModel;
}

class View<TModel> {
    constructor(options: ViewOptions<TModel>) { }
    model: TModel;
}

class Model { }
class MyView extends View<Model> { }

var m: ViewOptions<Model> = { model: new Model() };
var aView = new View({ model: new Model() }); 
var aView2 = new View(m); 
var myView = new MyView(m); // was error


//// [specializedInheritedConstructors1.js]
class View {
    constructor(options) { }
    model;
}
class Model {
}
class MyView extends View {
}
var m = { model: new Model() };
var aView = new View({ model: new Model() });
var aView2 = new View(m);
var myView = new MyView(m); // was error
