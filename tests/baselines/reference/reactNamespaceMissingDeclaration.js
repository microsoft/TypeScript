//// [reactNamespaceMissingDeclaration.tsx]
// Error myReactLib not declared
<foo data/>

//// [reactNamespaceMissingDeclaration.js]
// Error myReactLib not declared
myReactLib.createElement("foo", { data: true });
