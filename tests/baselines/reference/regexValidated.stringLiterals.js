//// [regexValidated.stringLiterals.ts]
let fontColor: /^#([0-9a-f]{3}|[0-9a-f]{6})$/i = '#000';

let catdogfish: /^(dog|cat|fish)(,(dog|cat|fish))*$/ = 'cat,fish,dog,fish,cat';

let digits: /^[0-9]+$/ = '02338374729';

let hexDigits: /^([0-9]|[A-F])+$/ = '0F12A';

type Email = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
let address: Email = 'typescript@microsoft.com';

type Gmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@gmail\.com$/i;
let gmailAddress: Gmail = 'example@GMAIL.COM';




//// [regexValidated.stringLiterals.js]
var fontColor = '#000';
var catdogfish = 'cat,fish,dog,fish,cat';
var digits = '02338374729';
var hexDigits = '0F12A';
var address = 'typescript@microsoft.com';
var gmailAddress = 'example@GMAIL.COM';


//// [regexValidated.stringLiterals.d.ts]
declare let fontColor: /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
declare let catdogfish: /^(dog|cat|fish)(,(dog|cat|fish))*$/;
declare let digits: /^[0-9]+$/;
declare let hexDigits: /^([0-9]|[A-F])+$/;
declare type Email = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
declare let address: Email;
declare type Gmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@gmail\.com$/i;
declare let gmailAddress: Gmail;
