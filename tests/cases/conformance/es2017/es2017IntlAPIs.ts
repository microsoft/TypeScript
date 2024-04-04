// @target: es2017

Intl.DateTimeFormat('en').formatToParts()[0];
Intl.DateTimeFormat('en').formatToParts(new Date())[0];
Intl.DateTimeFormat('en').formatToParts(Date.now())[0];
