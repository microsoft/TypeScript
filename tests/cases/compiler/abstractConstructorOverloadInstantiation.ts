declare const concreteConstructor: new () => void;
declare const abstractConstructor: abstract new () => void;

new concreteConstructor(); // should work
new abstractConstructor(); // should error

type AmbiguousMixedConstructorAbstractFirst =
    & (abstract new () => void)
    & (new () => void);

type AmbiguousMixedConstructorConcreteFirst =
    & (new () => void)
    & (abstract new () => void);

declare const ambiguousMixedConstructorAbstractFirst: AmbiguousMixedConstructorAbstractFirst;
declare const ambiguousMixedConstructorConcreteFirst: AmbiguousMixedConstructorConcreteFirst;

new ambiguousMixedConstructorAbstractFirst(); // should error
new ambiguousMixedConstructorConcreteFirst(); // should work

type DistinctMixedConstructorAbstractFirst =
    & (abstract new (arg: "abstract") => void)
    & (new (arg: "concrete") => void);

type DistinctMixedConstructorConcreteFirst =
    & (new (arg: "concrete") => void)
    & (abstract new (arg: "abstract") => void);

declare let distinctMixedConstructorAbstractFirst: DistinctMixedConstructorAbstractFirst;
declare let distinctMixedConstructorConcreteFirst: DistinctMixedConstructorConcreteFirst;

new distinctMixedConstructorAbstractFirst("abstract"); // should error
new distinctMixedConstructorAbstractFirst("concrete"); // should work

new distinctMixedConstructorConcreteFirst("abstract"); // should error
new distinctMixedConstructorConcreteFirst("concrete"); // should work
