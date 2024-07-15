/// <reference path="fourslash.ts" />

// @checkJs: true

// @Filename: /component.js
//// export class Component {
////   constructor() {
////     this.id_ = Math.random();
////   }
////   id() {
////     return this.id_;
////   }
//// }

// @Filename: /spatial-navigation.js
//// /** @import * as C from './component.js' */
////
//// export class SpatialNavigation {
////   /**
////    * @param {C.Component} component
////    */
////   add(component) {}
//// }

// @Filename: /player.js
//// import * as C from './component.js';
////
//// /**
////  * @extends C/*1*/.Component
////  */
//// export class Player extends Component {}

verify.baselineFindAllReferences("1");
