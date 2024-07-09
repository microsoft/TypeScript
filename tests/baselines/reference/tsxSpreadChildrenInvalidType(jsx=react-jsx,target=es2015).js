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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Todo(prop) {
    return _jsx("div", { children: prop.key.toString() + prop.todo });
}
function TodoList({ todos }) {
    return _jsxs("div", { children: [..._jsx(Todo, { todo: todos[0].todo }, todos[0].id)] });
}
function TodoListNoError({ todos }) {
    // any is not checked
    return _jsxs("div", { children: [..._jsx(Todo, { todo: todos[0].todo }, todos[0].id)] });
}
let x;
_jsx(TodoList, Object.assign({}, x));
