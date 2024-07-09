//// [tests/cases/conformance/jsx/tsxAttributeResolution.tsx] ////

//// [tsxAttributeResolution.tsx]
declare namespace JSX {
	interface IntrinsicElements {
		x: { y: number; z: string; };
	}
}




//// [tsxAttributeResolution.jsx]
