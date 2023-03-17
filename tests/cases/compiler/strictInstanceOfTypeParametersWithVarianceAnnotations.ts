// @strictInstanceOfTypeParameters: true

class UnconstrainedCovariant<out T> {
    x: T;
}

declare const unc_covariant: unknown;

if (unc_covariant instanceof UnconstrainedCovariant) {
    let unknown_covariant: UnconstrainedCovariant<unknown> = unc_covariant;
    let never_covariant: UnconstrainedCovariant<never> = unc_covariant;  // Error
    let any_covariant: UnconstrainedCovariant<any> = unc_covariant;
    let sub_covariant: UnconstrainedCovariant<"literal"> = unc_covariant;  // Error
}

class ConstrainedCovariant<out T extends string> {
    x: T;
}

declare const con_covariant: unknown;

if (con_covariant instanceof ConstrainedCovariant) {
    let never_covariant: ConstrainedCovariant<never> = con_covariant;  // Error
    let any_covariant: ConstrainedCovariant<any> = con_covariant;
    let constraint_covariant: ConstrainedCovariant<string> = con_covariant;
    let sub_covariant: ConstrainedCovariant<"literal"> = con_covariant;  // Error
}

class UnconstrainedContravariant<in T> {
    f: (x: T) => void;
}

declare const unc_contravariant: unknown;

if (unc_contravariant instanceof UnconstrainedContravariant) {
    let unknown_covariant: UnconstrainedContravariant<unknown> = unc_contravariant;  // Error
    let never_covariant: UnconstrainedContravariant<never> = unc_contravariant;
    let any_covariant: UnconstrainedContravariant<any> = unc_contravariant;  // Error
    let constraint_covariant: UnconstrainedContravariant<string> = unc_contravariant;  // Error
    let sub_covariant: UnconstrainedContravariant<"literal"> = unc_contravariant;  // Error
}

class ConstrainedContravariant<in T extends string> {
    f: (x: T) => void;
}

declare const con_contravariant: unknown;

if (con_contravariant instanceof ConstrainedContravariant) {
    let never_covariant: ConstrainedContravariant<never> = con_contravariant;
    let any_covariant: ConstrainedContravariant<any> = con_contravariant;  // Error
    let constraint_covariant: ConstrainedContravariant<string> = con_contravariant;  // Error
    let sub_covariant: ConstrainedContravariant<"literal"> = con_contravariant;  // Error
}

class UnconstrainedInvariant<in out T> {
    f: (x: T) => T;
}

declare const unc_invariant: unknown;

if (unc_invariant instanceof UnconstrainedInvariant) {
    let unknown_covariant: UnconstrainedInvariant<unknown> = unc_invariant;
    let never_covariant: UnconstrainedInvariant<never> = unc_invariant;  // Error
    let any_covariant: UnconstrainedInvariant<any> = unc_invariant;
    let constraint_covariant: UnconstrainedInvariant<string> = unc_invariant;  // Error
    let sub_covariant: UnconstrainedInvariant<"literal"> = unc_invariant;  // Error
}

class ConstrainedInvariant<in out T extends string> {
    f: (x: T) => T;
}

declare const con_invariant: unknown;

if (con_invariant instanceof ConstrainedInvariant) {
    let never_covariant: ConstrainedInvariant<never> = con_invariant;  // Error
    let any_covariant: ConstrainedInvariant<any> = con_invariant;
    let constraint_covariant: ConstrainedInvariant<string> = con_invariant;
    let sub_covariant: ConstrainedInvariant<"literal"> = con_invariant;  // Error
}
