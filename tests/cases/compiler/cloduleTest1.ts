  declare function $(selector: string): $;  
  interface $ {
      addClass(className: string): $;
  }
  namespace $ {
    export interface AjaxSettings {
    }
    export function ajax(options: AjaxSettings) { }
  }
  var it: $ = $('.foo').addClass('bar');
