// @strict: true
// @noEmit: true

interface NodeMap {
  ClassBody: ClassBody;
  Expression: Expression;
  Function: Function;
  PropertyDefinition: PropertyDefinition;
  Statement: Statement;
}

type Node = NodeMap[keyof NodeMap];

type Function =
  | FunctionDeclaration
  | FunctionExpression
  | ArrowFunctionExpression;

type Statement = BlockStatement | ReturnStatement;

interface BlockStatement {
  type: "BlockStatement";
  body: Statement[];
}

interface ReturnStatement {
  type: "ReturnStatement";
}

interface FunctionDeclaration {
  type: "FunctionDeclaration";
  body: BlockStatement;
}

interface ExpressionMap {
  ArrowFunctionExpression: ArrowFunctionExpression;
  ClassExpression: ClassExpression;
  FunctionExpression: FunctionExpression;
  Identifier: Identifier;
  NewExpression: NewExpression;
  ObjectExpression: ObjectExpression;
}

type Expression = ExpressionMap[keyof ExpressionMap];

interface ObjectExpression {
  type: "ObjectExpression";
}

interface PropertyDefinition {
  type: "PropertyDefinition";
  key: Expression;
}

interface FunctionExpression {
  type: "FunctionExpression";
  body: BlockStatement;
}

interface NewExpression {
  type: "NewExpression";
  callee: Expression;
  arguments: Array<Expression>;
}

interface Identifier {
  type: "Identifier";
  name: string;
}

interface ArrowFunctionExpression {
  type: "ArrowFunctionExpression";
  body: BlockStatement | Expression;
}

interface ClassBody {
  type: "ClassBody";
  body: Array<PropertyDefinition>;
}

interface ClassExpression {
  type: "ClassExpression";
  body: ClassBody;
}

export function getNestedReturnStatements(node: Node): Array<ReturnStatement> {
  const returnStatements: Array<ReturnStatement> = [];

  if (node.type === "ReturnStatement") {
    returnStatements.push(node);
  }

  if ("body" in node && node.body !== undefined && node.body !== null) {
    Array.isArray(node.body)
      ? node.body.forEach((x) => {
          returnStatements.push(...getNestedReturnStatements(x));
        })
      : returnStatements.push(...getNestedReturnStatements(node.body));
  }

  return returnStatements;
}
