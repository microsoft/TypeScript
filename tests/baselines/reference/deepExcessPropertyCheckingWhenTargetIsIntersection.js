//// [deepExcessPropertyCheckingWhenTargetIsIntersection.ts]
interface StatelessComponent<P = {}> {
  (props: P & { children?: number }, context?: any): null;
}
 
const TestComponent: StatelessComponent<TestProps> = (props) => {
  return null;
}
 
interface ITestProps {
  ariaLabel?: string;
}
 
interface NestedProp<TProps> {
  props: TProps;
}
 
interface TestProps {
  icon: NestedProp<ITestProps>;
}
 
TestComponent({icon: { props: { INVALID_PROP_NAME: 'share', ariaLabel: 'test label' } }});

const TestComponent2: StatelessComponent<TestProps | {props2: {x: number}}> = (props) => {
  return null;
}

TestComponent2({icon: { props: { INVALID_PROP_NAME: 'share', ariaLabel: 'test label' } }});


//// [deepExcessPropertyCheckingWhenTargetIsIntersection.js]
var TestComponent = function (props) {
    return null;
};
TestComponent({ icon: { props: { INVALID_PROP_NAME: 'share', ariaLabel: 'test label' } } });
var TestComponent2 = function (props) {
    return null;
};
TestComponent2({ icon: { props: { INVALID_PROP_NAME: 'share', ariaLabel: 'test label' } } });
