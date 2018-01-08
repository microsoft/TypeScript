let fontColor: /^#([0-9a-f]{3}|[0-9a-f]{6})$/i = '#0000'; // not 3 or 6 characters

let catdogfish: /^(dog|cat|fish)(,(dog|cat|fish))*$/ = 'cat,fish,dog,fosh,cat'; // misspelled fish

let digits: /^[0-9]+$/ = '02338374729O'; // Capital O isn't 0

let hexDigits: /^([0-9]|[A-F])+$/ = 'X0F12A'; // X isn't a hex digit

type Email = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
let address: Email = 'type★script@microsoft.com'; // ★ isn't part of the validated range for addresses

type Gmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@gmail\.com$/i;
let gmailAddress: Gmail = 'example@GMAIL.ORG'; // wrong tld


