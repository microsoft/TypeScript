// @target: es2015
// @strict: true

type BuildTuple<Length extends number, Elements extends unknown[] = []> =
	Elements["length"] extends Length ? [] : [unknown, ...BuildTuple<Length, [unknown, ...Elements]>];

declare const shallow: BuildTuple<8>;
const shallowLength: 8 = shallow.length;

type Deep = BuildTuple<200>;
