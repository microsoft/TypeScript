//// [tests/cases/conformance/jsx/tsxSpreadChildrenInvalidType.tsx] ////

//// [tsxSpreadChildrenInvalidType.tsx]
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
        {...<Todo key={todos[0].id} todo={todos[0].todo} />}
    </div>;
}
function TodoListNoError({ todos }: TodoListProps) {
    // any is not checked
    return <div>
        {...(<Todo key={todos[0].id} todo={todos[0].todo} /> as any)}
    </div>;
}
let x: TodoListProps;
    <TodoList {...x}/>


//// [tsxSpreadChildrenInvalidType.js]
function Todo(prop) {
    return React.createElement("div", null, prop.key.toString() + prop.todo);
}
function TodoList({ todos }) {
    return React.createElement("div", null, ...React.createElement(Todo, { key: todos[0].id, todo: todos[0].todo }));
}
function TodoListNoError({ todos }) {
    // any is not checked
    return React.createElement("div", null, ...React.createElement(Todo, { key: todos[0].id, todo: todos[0].todo }));
}
let x;
React.createElement(TodoList, Object.assign({}, x));
