//// [tests/cases/compiler/targetEs6DecoratorMetadataImportNotElided.ts] ////

//// [deps.ts]
export function Input(): any { }
export class TemplateRef { }

//// [index.ts]
import { Input, TemplateRef } from './deps';

export class MyComponent {
    _ref: TemplateRef;

    @Input()
    get ref() { return this._ref; }
    set ref(value: TemplateRef) { this._ref = value; }
}


//// [deps.js]
export function Input() { }
export class TemplateRef {
}
//// [index.js]
import { Input } from './deps';
export class MyComponent {
    _ref;
    @Input()
    get ref() { return this._ref; }
    set ref(value) { this._ref = value; }
}
