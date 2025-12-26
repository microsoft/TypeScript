// @strict: true
// @noEmit: true

type Term = NamedNode | BlankNode | Literal | Variable | BaseQuad;

interface NamedNode<Iri extends string = string> {
  termType: "NamedNode";
  value: Iri;
}

interface BlankNode {
  termType: "BlankNode";
  value: string;
}

interface Literal {
  termType: "Literal";
  value: string;
  language: string;
  direction?: "ltr" | "rtl" | "" | null;
}

interface Variable {
  termType: "Variable";
  value: string;
}

type Quad_Subject = NamedNode | BlankNode | Quad | Variable;
type Quad_Predicate = NamedNode | Variable;
type Quad_Object = NamedNode | Literal | BlankNode | Quad | Variable;

interface BaseQuad {
  termType: "Quad";
  value: "";
  subject: Term;
  predicate: Term;
  object: Term;
}

interface Quad extends BaseQuad {
  subject: Quad_Subject;
  predicate: Quad_Predicate;
  object: Quad_Object;
}

declare class DataFactory {
  quad<Q extends BaseQuad = Quad>(
    subject: Q["subject"],
    predicate: Q["predicate"],
    object: Q["object"],
  ): Q;
  namedNode<Iri extends string = string>(value: Iri): NamedNode<Iri>;
  blankNode(value?: string): BlankNode;
}

declare const factory: DataFactory;

const res1 = factory.quad(
  factory.namedNode("http://example.org/subject"),
  factory.namedNode("http://example.org/predicate"),
  factory.namedNode("http://example.org/object"),
);

const res2 = factory.quad(
  factory.namedNode("http://example.org/subject"),
  factory.blankNode("34"), // error
  factory.namedNode("http://example.org/object"),
);
