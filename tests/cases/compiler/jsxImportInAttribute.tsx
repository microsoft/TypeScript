//@jsx: preserve
//@module: commonjs

//@filename: component.d.ts
declare module "Test" {
	export default class Text { }
}

//@filename: consumer.tsx
/// <reference path="component.d.ts" />
import Test from 'Test';

let x = Test; // emit test_1.default
<anything attr={Test} />; // ?
