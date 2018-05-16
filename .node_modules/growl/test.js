
var growl = require('./lib/growl')

growl('Support sound notifications', {title: 'Make a sound', sound: 'purr'});
growl('You have mail!')
growl('5 new messages', { sticky: true })
growl('5 new emails', { title: 'Email Client', image: 'Safari', sticky: true })
growl('Message with title', { title: 'Title'})
growl('Set priority', { priority: 2 })
growl('Show Safari icon', { image: 'Safari' })
growl('Show icon', { image: 'path/to/icon.icns' })
growl('Show image', { image: 'path/to/my.image.png' })
growl('Show png filesystem icon', { image: 'png' })
growl('Show pdf filesystem icon', { image: 'article.pdf' })
growl('Show pdf filesystem icon', { image: 'article.pdf' }, function(){
  console.log('callback');
})
growl('Show pdf filesystem icon', { title: 'Use show()', image: 'article.pdf' })
growl('here \' are \n some \\ characters that " need escaping', {}, function(error, stdout, stderr) {
  if (error !== null) throw new Error('escaping failed:\n' + stdout + stderr);
})
growl('Allow custom notifiers', { exec: 'echo XXX %s' }, function(error, stdout, stderr) {
  console.log(stdout);
})
growl('Allow custom notifiers', { title: 'test', exec: 'echo YYY' }, function(error, stdout, stderr) {
  console.log(stdout);
})
growl('Allow custom notifiers', { title: 'test', exec: 'echo ZZZ %s' }, function(error, stdout, stderr) {
  console.log(stdout);
})
growl('Open a URL', { url: 'https://npmjs.org/package/growl' });
