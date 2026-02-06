// @target: es2015
const [, a = ''] = ''.match('') || [];

a.toFixed()