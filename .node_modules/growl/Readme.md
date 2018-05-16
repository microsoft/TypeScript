# Growl for nodejs
[![Build Status](https://travis-ci.org/tj/node-growl.svg?branch=master)](https://travis-ci.org/tj/node-growl)

Growl support for Nodejs. This is essentially a port of my [Ruby Growl Library](http://github.com/visionmedia/growl). Ubuntu/Linux support added thanks to [@niftylettuce](http://github.com/niftylettuce).

## Installation

### Install

### Mac OS X (Darwin):

  Install [growlnotify(1)](http://growl.info/extras.php#growlnotify). On OS X 10.8, Notification Center is supported using [terminal-notifier](https://github.com/alloy/terminal-notifier). To install:

    $ sudo gem install terminal-notifier

  Install [npm](http://npmjs.org/) and run:

    $ npm install growl

### Ubuntu (Linux):

  Install `notify-send` through the [libnotify-bin](http://packages.ubuntu.com/libnotify-bin) package:

    $ sudo apt-get install libnotify-bin

  Install [npm](http://npmjs.org/) and run:

    $ npm install growl

### Windows:

  Download and install [Growl for Windows](http://www.growlforwindows.com/gfw/default.aspx)

  Download [growlnotify](http://www.growlforwindows.com/gfw/help/growlnotify.aspx) - **IMPORTANT :** Unpack growlnotify to a folder that is present in your path!

  Install [npm](http://npmjs.org/) and run:

    $ npm install growl

## Examples

Callback functions are optional

```javascript
var growl = require('growl')
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
growl('Show pdf filesystem icon', { image: 'article.pdf' }, function(err){
  // ... notified
})
```

## Options

  - title
    - notification title
  - name
    - application name
  - priority
    - priority for the notification (default is 0)
  - sticky
    - weither or not the notification should remainin until closed
  - image
    - Auto-detects the context:
      - path to an icon sets --iconpath
      - path to an image sets --image
      - capitalized word sets --appIcon
      - filename uses extname as --icon
      - otherwise treated as --icon
  - exec
    - manually specify a shell command instead
      - appends message to end of shell command
      - or, replaces `%s` with message
      - optionally prepends title (example: `title: message`)
      - examples: `{exec: 'tmux display-message'}`, `{exec: 'echo "%s" > messages.log}`

## License

(The MIT License)

Copyright (c) 2009 TJ Holowaychuk <tj@vision-media.ca>
Copyright (c) 2016 Joshua Boy Nicolai Appelman <joshua@jbna.nl>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
