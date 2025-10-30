// @strict: true
// @exactOptionalPropertyTypes: true, false
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/58174

type A_Primitive = {
  disabled?: boolean;
};

type B_Primitive = {
  disabled?: boolean | undefined;
};

type C_Primitive = {
  disabled?: boolean;
};

declare const ab_primitive: A_Primitive & B_Primitive;
declare const ac_primitive: A_Primitive & C_Primitive;

const ab_disabled_read = ab_primitive.disabled;
const ac_disabled_read = ac_primitive.disabled;

ab_primitive.disabled = undefined;
ac_primitive.disabled = undefined;

type Foo = {
  prop: boolean;
};

type A_Obj = {
  prop?: Foo;
};

type B_Obj = {
  prop?: Foo | undefined;
};

type C_Obj = {
  prop?: Foo;
};

declare const ab_obj: A_Obj & B_Obj;
declare const ac_obj: A_Obj & C_Obj;

const ab_prop_read = ab_obj.prop;
const ac_prop_read = ac_obj.prop;

ab_obj.prop = undefined;
ac_obj.prop = undefined;
