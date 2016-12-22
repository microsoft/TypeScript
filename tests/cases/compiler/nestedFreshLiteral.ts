// @strictNullChecks: true
interface CSSProps  {
  color?: string
}
interface NestedCSSProps {
  nested?: NestedSelector
}
interface NestedSelector  {
  prop: CSSProps;
}

let stylen: NestedCSSProps = {
  nested: { prop: { colour: 'red' } }
}