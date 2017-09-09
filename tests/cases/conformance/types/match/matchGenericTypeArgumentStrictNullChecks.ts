// @declaration: true
// @strictNullChecks: true
// all of these test `match` with generics and --strictNullChecks.

// empty
type A<T> = T match {
};
declare const A1: A<1>;
declare const A1or2: A<1 | 2>;
declare const Astring: A<"">;
declare const Aempty: A<{}>;
declare const Anever: A<never>;
declare const Aany: A<any>;
declare const Aundefined: A<undefined>;

// only else
type B<T> = T match {
    else: "else"
};
declare const B1: B<1>;
declare const B1or2: B<1 | 2>;
declare const Bstring: B<"">;
declare const Bempty: B<{}>;
declare const Bnever: B<never>;
declare const Bany: B<any>;
declare const Bundefined: B<undefined>;

// only one exact match, no else
type C<T> = T match {
    1: "1"
};
declare const C1: C<1>;
declare const C1or2: C<1 | 2>;
declare const Cstring: C<"">;
declare const Cempty: C<{}>;
declare const Cnever: C<never>;
declare const Cany: C<any>;
declare const Cundefined: C<undefined>;

// only one subtype match, no else
type D<T> = T match {
    number: "number"
};
declare const D1: D<1>;
declare const D1or2: D<1 | 2>;
declare const Dstring: D<"">;
declare const Dempty: D<{}>;
declare const Dnever: D<never>;
declare const Dany: D<any>;
declare const Dundefined: D<undefined>;

// multiple possible subtype matches, no else
type E<T> = T match {
    1 | 2: "1 | 2",
    number: "number"
};
declare const E1: E<1>;
declare const E1or2: E<1 | 2>;
declare const E3: E<3>;
declare const Estring: E<"">;
declare const Eempty: E<{}>;
declare const Enever: E<never>;
declare const Eany: E<any>;
declare const Eundefined: E<undefined>;

// multiple possible matches (subtype first), no else
type F<T> = T match {
    1 | 2: "1 | 2",
    1: "1",
    number: "number"
};
declare const F1: F<1>;
declare const F1or2: F<1 | 2>;
declare const F2or3: F<2 | 3>;
declare const F3: F<3>;
declare const Fstring: F<"">;
declare const Fempty: F<{}>;
declare const Fnever: F<never>;
declare const Fany: F<any>;
declare const Fundefined: F<undefined>;

// never
type G<T> = T match {
    never: "never",
    number: "number",
    else: "else"
};
declare const G1: G<1>;
declare const G1or2: G<1 | 2>;
declare const Gstring: G<"">;
declare const Gempty: G<{}>;
declare const Gnever: G<never>;
declare const Gany: G<any>;
declare const Gundefined: G<undefined>;

// undefined
type H<T> = T match {
    undefined: "undefined",
    number: "number",
    else: "else"
};
declare const H1: H<1>;
declare const H1or2: H<1 | 2>;
declare const Hstring: H<"">;
declare const Hempty: H<{}>;
declare const Hnever: H<never>;
declare const Hany: H<any>;
declare const Hundefined: H<undefined>;
