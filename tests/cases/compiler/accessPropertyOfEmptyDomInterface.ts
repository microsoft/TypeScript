// @lib: es2019

interface HTMLInputElement {}
interface EventTarget {}
interface HTMLInputElementFoo {}

let _: any;

// These errors should suggest adding 'dom' to `lib`.
const element = {} as HTMLInputElement;
_ = element.value;
const intersection = {} as HTMLInputElement & EventTarget;
_ = intersection.value;
const union = {} as HTMLInputElement | EventTarget;
_ = union.value;

// These errors should not suggest adding 'dom' to `lib`.
_ = undefined.value;
const stringLiteral = "HTMLInputElement";
_ = stringLiteral.value;
const asKey = { HTMLInputElement: "" };
_ = asKey.value;
const extraCharacters = {} as HTMLInputElementFoo;
_ = extraCharacters.value;
