//// [tests/cases/conformance/jsx/tsxSpreadChildren.tsx] ////

//// [tsxSpreadChildren.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}
declare var React: any;

interface TodoProp {
    id: number;
    todo: string;
}
interface TodoListProps {
    todos: TodoProp[];
}
function Todo(prop: { key: number, todo: string }) {
    return <div>{prop.key.toString() + prop.todo}</div>;
}
function TodoList({ todos }: TodoListProps) {
    return <div>
        {...todos.map(todo => <Todo key={todo.id} todo={todo.todo}/>)}
    </div>;
}
let x: TodoListProps;
    <TodoList {...x}/>


//// [tsxSpreadChildren.jsx]
function Todo(prop) {
    return <div>{prop.key.toString() + prop.todo}</div>;
}
function TodoList(_a) {
    var todos = _a.todos;
    return <div>
        {...todos.map(function (todo) { return <Todo key={todo.id} todo={todo.todo}/>; })}
    </div>;
}
var x;
<TodoList {...x}/>;
