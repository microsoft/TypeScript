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
//// /** @import { Component } from './component.js' */
////
//// export class SpatialNavigation {
////   /**
////    * @param {Component} component
////    */
////   add(component) {}
//// }

// @Filename: /player.js
//// import { Component } from './component.js';
////
//// /**
////  * @extends Component/*1*/
////  */
//// export class Player extends Component {}

verify.baselineFindAllReferences("1");
