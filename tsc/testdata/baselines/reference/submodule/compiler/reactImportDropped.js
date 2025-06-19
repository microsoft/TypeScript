//// [tests/cases/compiler/reactImportDropped.ts] ////

//// [react.d.ts]
export = React;
export as namespace React;

declare namespace React {

    function createClass(spec: any): ClassicComponentClass;

    interface ClassicComponentClass {
        new (props?: any): ClassicComponentClass;
    }
}

declare global {
    namespace JSX {
        interface ElementAttributesProperty { }
    }
}


//// [TabBar.js]
export default React.createClass({
  render() {
    return (
      null
    );
  }
});

//// [NavigationView.js]
import TabBar from '../../components/TabBar';
import {layout} from '../../utils/theme'; // <- DO NOT DROP this import
const x = <TabBar height={layout.footerHeight} />;


//// [TabBar.js]
export default React.createClass({
    render() {
        return (null);
    }
});
//// [NavigationView.js]
import TabBar from '../../components/TabBar';
import { layout } from '../../utils/theme'; // <- DO NOT DROP this import
const x = React.createElement(TabBar, { height: layout.footerHeight });
