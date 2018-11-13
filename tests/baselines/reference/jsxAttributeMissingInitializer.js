//// [jsxAttributeMissingInitializer.tsx]
const x = <div foo= ></div>;
const y = 0;


//// [jsxAttributeMissingInitializer.jsx]
var x = <div foo></div>;
var y = 0;
