// @strict: true
// @noEmit: true

type NumericConstraint<Value extends number> = Value;

type VarianceConstrainedNumber<in out Value extends number> =
  NumericConstraint<Value>;

declare let vcn1: VarianceConstrainedNumber<1>;
declare let vcn12: VarianceConstrainedNumber<1 | 2>;

vcn1 = vcn12;
vcn12 = vcn1;

type Unconstrained<Value> = Value;

type VarianceUnconstrained<in out Value> = Unconstrained<Value>;

declare let vu1: VarianceUnconstrained<1>;
declare let vu12: VarianceUnconstrained<1 | 2>;

vu1 = vu12;
vu12 = vu1;

type Level3of3Unconstrained<Value> = Value;
type Level2of3Unconstrained<Value> = Level3of3Unconstrained<Value>;
type Level1of3Unconstrained<Value> = Level2of3Unconstrained<Value>;

type VarianceDeepUnconstrained<in out Value> = Level1of3Unconstrained<Value>;

declare let vdu1: VarianceDeepUnconstrained<1>;
declare let vdu12: VarianceDeepUnconstrained<1 | 2>;

vdu1 = vdu12;
vdu12 = vdu1;

interface Shape<Value> {
  value: Value;
}

type VarianceShape<in out Value> = Shape<Value>;

declare let vs1: VarianceShape<1>;
declare let vs12: VarianceShape<1 | 2>;

vs1 = vs12;
vs12 = vs1;

interface Level3of3Shape<Value> {
  value: Value;
}

type Level2of3Shape<Value> = Level3of3Shape<Value>;
type Level1of3Shape<Value> = Level2of3Shape<Value>;

type VarianceDeepShape<in out Value> = Level1of3Shape<Value>;

declare let vds1: VarianceDeepShape<1>;
declare let vds12: VarianceDeepShape<1 | 2>;

vds1 = vds12;
vds12 = vds1;
