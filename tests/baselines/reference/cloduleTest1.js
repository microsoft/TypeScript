//// [tests/cases/compiler/cloduleTest1.ts] ////

//// [cloduleTest1.ts]
  declare function $(selector: string): $;  
  interface $ {
      addClass(className: string): $;
  }
  module $ {
    export interface AjaxSettings {
    }
    export function ajax(options: AjaxSettings) { }
  }
  var it: $ = $('.foo').addClass('bar');


//// [cloduleTest1.js]
var $;
(function ($) {
    function ajax(options) { }
    $.ajax = ajax;
})($ || ($ = {}));
var it = $('.foo').addClass('bar');
