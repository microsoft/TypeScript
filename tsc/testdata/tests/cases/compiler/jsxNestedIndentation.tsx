// @target: esnext
// @jsx: react
// @strict: true
// @noEmit: false

declare var React: any;
declare function Child(props: { children?: any }): any;
function Test() {
    return <Child>
        <Child>
            <Child></Child>
        </Child>
    </Child>
}
