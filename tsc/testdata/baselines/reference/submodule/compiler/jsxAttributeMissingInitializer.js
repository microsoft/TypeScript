//// [tests/cases/compiler/jsxAttributeMissingInitializer.tsx] ////

//// [jsxAttributeMissingInitializer.tsx]
const x = <div foo= ></div>;
const y = 0;


//// [jsxAttributeMissingInitializer.jsx]
const x = <div foo></div>;
const y = 0;
