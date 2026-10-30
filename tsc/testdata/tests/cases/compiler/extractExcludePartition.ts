// @strict: true
// @noEmit: true

type MyExtract<T, U> = T & U;
type MyExclude<T, U> = T & not U;
type MyOmit<T, K extends keyof any> = Pick<T, MyExclude<keyof T, K>>;
type Partition<T, U> = MyExtract<T, U> | MyExclude<T, U>;

function partition<T, U>(value: T): Partition<T, U> {
    return value;
}

function identity<T, U>(value: Partition<T, U>): T {
    return value;
}

type UnionPartition<T, A, B> = MyExtract<T, A | B> | MyExclude<T, A | B>;

function unionPartition<T, A, B>(value: T): UnionPartition<T, A, B> {
    return value;
}

function unionIdentity<T, A, B>(value: UnionPartition<T, A, B>): T {
    return value;
}

type RepeatedPartition<T, U, W> = Partition<T, U> | Partition<T, W>;

function repeatedPartition<T, U, W>(value: T): RepeatedPartition<T, U, W> {
    return value;
}

function repeatedIdentity<T, U, W>(value: RepeatedPartition<T, U, W>): T {
    return value;
}

type DifferentBasePartitions<T, Q, U> = Partition<T, U> | Partition<Q, U>;

function differentBasePartitions<T, Q, U>(value: T | Q): DifferentBasePartitions<T, Q, U> {
    return value;
}

function differentBaseIdentity<T, Q, U>(value: DifferentBasePartitions<T, Q, U>): T | Q {
    return value;
}

type UnionBasePartition<T, U, A, B> = Partition<T | U, A | B>;

function unionBasePartition<T, U, A, B>(value: T | U): UnionBasePartition<T, U, A, B> {
    return value;
}

function unionBaseIdentity<T, U, A, B>(value: UnionBasePartition<T, U, A, B>): T | U {
    return value;
}

type RepeatedUnionPartition<T, A, B, C, D> = Partition<T, A | B> | Partition<T, C | D>;

function repeatedUnionPartition<T, A, B, C, D>(value: T): RepeatedUnionPartition<T, A, B, C, D> {
    return value;
}

function repeatedUnionIdentity<T, A, B, C, D>(value: RepeatedUnionPartition<T, A, B, C, D>): T {
    return value;
}

type BooleanPartition<T, A, B> =
    | MyExtract<MyExtract<T, A>, B>
    | MyExclude<MyExtract<T, A>, B>
    | MyExtract<MyExclude<T, A>, B>
    | MyExclude<MyExclude<T, A>, B>;

function booleanPartition<T, A, B>(value: T): BooleanPartition<T, A, B> {
    return value;
}

function booleanIdentity<T, A, B>(value: BooleanPartition<T, A, B>): T {
    return value;
}

type PartitionWithRemainder<T, U, R> = MyExtract<T, U> | MyExclude<T, U> | R;

function partitionWithRemainder<T, U, R>(value: T | R): PartitionWithRemainder<T, U, R> {
    return value;
}

function remainderIdentity<T, U, R>(value: PartitionWithRemainder<T, U, R>): T | R {
    return value;
}

type IntersectionBasePartition<T, Q, U> = MyExtract<T & Q, U> | MyExclude<T & Q, U>;

function intersectionBasePartition<T, Q, U>(value: T & Q): IntersectionBasePartition<T, Q, U> {
    return value;
}

function intersectionBaseIdentity<T, Q, U>(value: IntersectionBasePartition<T, Q, U>): T & Q {
    return value;
}

type NeverPartition<T> = MyExtract<T, never> | MyExclude<T, never>;
type UnknownPartition<T> = MyExtract<T, unknown> | MyExclude<T, unknown>;

function degeneratePartitions<T>(neverPartition: NeverPartition<T>, unknownPartition: UnknownPartition<T>): T {
    return Math.random() ? neverPartition : unknownPartition;
}

type IncompletePartition<T, A, B> = MyExtract<T, A> | MyExclude<T, A | B>;

function incompletePartition<T, A, B>(value: T): IncompletePartition<T, A, B> {
    // Error: The positive branch does not cover B.
    return value;
}

function incompleteIdentity<T, A, B>(value: IncompletePartition<T, A, B>): T {
    return value;
}

type MismatchedPartition<T, Q, U> = MyExtract<T, U> | MyExclude<Q, U>;

function mismatchedPartition<T, Q, U>(value: T | Q): MismatchedPartition<T, Q, U> {
    // Error: The positive and negative branches have different bases.
    return value;
}

function mismatchedIdentity<T, Q, U>(value: MismatchedPartition<T, Q, U>): T | Q {
    return value;
}

type InjectedProps = {
    owner: string;
};

declare function withOwner<T extends InjectedProps>(props: MyOmit<T, keyof InjectedProps> & InjectedProps): T;

function render<T extends InjectedProps>(props: T) {
    return withOwner<T>(props);
}

type NegatedBasePartition<T, U, V> = MyExtract<MyExclude<T, V>, U> | MyExclude<MyExclude<T, V>, U>;

function negatedBasePartition<T, U, V>(value: T & not V): NegatedBasePartition<T, U, V> {
    return value;
}

function negatedBaseIdentity<T, U, V>(value: NegatedBasePartition<T, U, V>): T & not V {
    return value;
}

type DeferredPartition<T, U, V> = MyExtract<T, U> | MyExclude<T, V>;

function instantiatedPartition<T, U>(value: T): DeferredPartition<T, U, U> {
    return value;
}

function instantiatedIdentity<T, U>(value: DeferredPartition<T, U, U>): T {
    return value;
}

type RecursivePartition =
    | { next: RecursivePartition; value: string }
    | ({ next: unknown } & not { value: string });

declare const recursivePartition: RecursivePartition;
const recursiveNext: unknown = recursivePartition.next;
// Error: The recursive union is not a number.
const recursiveNumber: number = recursivePartition;

type PartitionWithPositiveRemainder<T, U, V> = (T & U) | (T & not U & V);

function positiveRemainder<T, U, V>(value: T & U): PartitionWithPositiveRemainder<T, U, V> {
    return value;
}

function reducedBase<T, U, V>(value: T & V): PartitionWithPositiveRemainder<T, U, V> {
    return value;
}

function positiveRemainderIdentity<T, U, V>(value: PartitionWithPositiveRemainder<T, U, V>): (T & U) | (T & V) {
    return value;
}

type PartitionContainer<Value> = { value: Value };
type OuterPartition = PartitionContainer<InnerPartition>;
type InnerPartition = "chosen" | (string & not "chosen");

function nestedPartition(value: string): InnerPartition {
    return value;
}

function nestedPartitionElement(value: string): OuterPartition["value"] {
    return value;
}

type ComplementPartition =
    | { next: ComplementPartition; value: string }
    | ({ next: unknown } & not { value: string })
    | { next: unknown; value: string };

function recursiveComplement(value: { next: unknown }): ComplementPartition {
    // Error: Recursive reduction commits to the unreduced union.
    return value;
}

function recursiveComplementMember(value: unknown): ComplementPartition["next"] {
    return value;
}

declare const complementPartition: ComplementPartition;
const complementNode: unknown = complementPartition.next;
// Error: Reduction must not turn a recursive member into any.
const complementNumber: number = complementPartition.next;

type ForwardComplementMember = ForwardComplementPartition["next"];
type ForwardComplementPartition =
    | { next: ForwardComplementPartition; value: string }
    | ({ next: unknown } & not { value: string })
    | { next: unknown; value: string };

function forwardComplement(value: { next: unknown }): ForwardComplementPartition {
    // Error: Recursive reduction commits to the unreduced union.
    return value;
}

function forwardComplementMember(value: unknown): ForwardComplementMember {
    return value;
}

declare const forwardComplementValue: ForwardComplementMember;
// Error: Resolving the indexed access first must still produce unknown.
const forwardComplementNumber: number = forwardComplementValue;