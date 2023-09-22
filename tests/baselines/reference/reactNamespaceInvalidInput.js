//// [tests/cases/compiler/reactNamespaceInvalidInput.tsx] ////

//// [reactNamespaceInvalidInput.tsx]
<foo data/>;


//// [reactNamespaceInvalidInput.js]
my-React-Lib.createElement("foo", { data: true });
