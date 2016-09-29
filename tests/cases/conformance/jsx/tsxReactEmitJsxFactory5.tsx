//@filename: file.tsx
//@jsx: react
//@jsxFactory: h
declare module JSX {
	interface IntrinsicElements {
		[s: string]: any;
	}
}

//@filename: h.d.ts
export var h;

//@filename: react-consumer.tsx
import {h} from "./h";
// Should not elide h import
<div />;
