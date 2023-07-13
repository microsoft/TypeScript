//// [tests/cases/conformance/jsx/tsxReactEmitNesting.tsx] ////

//// [file.tsx]
declare var vdom: any;
declare var ctrl: any;
declare var model: any;

// A simple render function with nesting and control statements
let render = (ctrl, model) =>
    <section class="todoapp">
        <header class="header">
            <h1>todos &lt;x&gt;</h1>
            <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" value={model.newTodo} onKeyup={ctrl.addTodo.bind(ctrl, model)} />
        </header>
        <section class="main" style={{display:(model.todos && model.todos.length) ? "block" : "none"}}>
            <input class="toggle-all" type="checkbox" onChange={ctrl.toggleAll.bind(ctrl)}/>
            <ul class="todo-list">
                {model.filteredTodos.map((todo) =>
                    <li class={{todo: true, completed: todo.completed, editing: todo == model.editedTodo}}>
                        <div class="view">
                            {(!todo.editable) ?
                                <input class="toggle" type="checkbox"></input>
                                : null
                            }
                            <label onDoubleClick={()=>{ctrl.editTodo(todo)}}>{todo.title}</label>
                            <button class="destroy" onClick={ctrl.removeTodo.bind(ctrl,todo)}></button>
                            <div class="iconBorder">
                                <div class="icon"/>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </section>
    </section>



//// [file.js]
// A simple render function with nesting and control statements
var render = function (ctrl, model) {
    return vdom.createElement("section", { class: "todoapp" },
        vdom.createElement("header", { class: "header" },
            vdom.createElement("h1", null, "todos <x>"),
            vdom.createElement("input", { class: "new-todo", autofocus: true, autocomplete: "off", placeholder: "What needs to be done?", value: model.newTodo, onKeyup: ctrl.addTodo.bind(ctrl, model) })),
        vdom.createElement("section", { class: "main", style: { display: (model.todos && model.todos.length) ? "block" : "none" } },
            vdom.createElement("input", { class: "toggle-all", type: "checkbox", onChange: ctrl.toggleAll.bind(ctrl) }),
            vdom.createElement("ul", { class: "todo-list" }, model.filteredTodos.map(function (todo) {
                return vdom.createElement("li", { class: { todo: true, completed: todo.completed, editing: todo == model.editedTodo } },
                    vdom.createElement("div", { class: "view" },
                        (!todo.editable) ?
                            vdom.createElement("input", { class: "toggle", type: "checkbox" })
                            : null,
                        vdom.createElement("label", { onDoubleClick: function () { ctrl.editTodo(todo); } }, todo.title),
                        vdom.createElement("button", { class: "destroy", onClick: ctrl.removeTodo.bind(ctrl, todo) }),
                        vdom.createElement("div", { class: "iconBorder" },
                            vdom.createElement("div", { class: "icon" }))));
            }))));
};
