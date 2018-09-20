//@module: es6
//@moduleResolution: node
//@target: es6
//@noImplicitAny: false
//@allowSyntheticDefaultImports: true
//@allowJs: true
//@jsx: react
//@outDir: build

//@filename: react.d.ts
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


//@filename: src/components/TabBar.js
export default React.createClass({
  render() {
    return (
      null
    );
  }
});

//@filename: src/modules/navigation/NavigationView.js
import TabBar from '../../components/TabBar';
import {layout} from '../../utils/theme'; // <- DO NOT DROP this import
const x = <TabBar height={layout.footerHeight} />;
