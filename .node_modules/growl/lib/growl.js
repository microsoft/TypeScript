'use strict';

// Growl - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Module dependencies.
 */

const spawn = require('child_process').spawn;
const fs = require('fs');
const path = require('path');
const os = require('os');

const exists = fs.existsSync || path.existsSync;
let cmd;

function which(name) {
  const paths = process.env.PATH.split(':');
  let loc;

  for (let i = 0, len = paths.length; i < len; i += 1) {
    loc = path.join(paths[i], name);
    if (exists(loc)) return loc;
  }
  return false;
}

function setupCmd() {
  switch (os.type()) {
    case 'Darwin':
      if (which('terminal-notifier')) {
        cmd = {
          type: 'Darwin-NotificationCenter',
          pkg: 'terminal-notifier',
          msg: '-message',
          title: '-title',
          subtitle: '-subtitle',
          icon: '-appIcon',
          sound: '-sound',
          url: '-open',
          priority: {
            cmd: '-execute',
            range: [],
          },
        };
      } else {
        cmd = {
          type: 'Darwin-Growl',
          pkg: 'growlnotify',
          msg: '-m',
          sticky: '--sticky',
          url: '--url',
          priority: {
            cmd: '--priority',
            range: [
              -2,
              -1,
              0,
              1,
              2,
              'Very Low',
              'Moderate',
              'Normal',
              'High',
              'Emergency',
            ],
          },
        };
      }
      break;
    case 'Linux':
      if (which('growl')) {
        cmd = {
          type: 'Linux-Growl',
          pkg: 'growl',
          msg: '-m',
          title: '-title',
          subtitle: '-subtitle',
          host: {
            cmd: '-H',
            hostname: '192.168.33.1',
          },
        };
      } else {
        cmd = {
          type: 'Linux',
          pkg: 'notify-send',
          msg: '',
          sticky: '-t 0',
          icon: '-i',
          priority: {
            cmd: '-u',
            range: [
              'low',
              'normal',
              'critical',
            ],
          },
        };
      }
      break;
    case 'Windows_NT':
      cmd = {
        type: 'Windows',
        pkg: 'growlnotify',
        msg: '',
        sticky: '/s:true',
        title: '/t:',
        icon: '/i:',
        url: '/cu:',
        priority: {
          cmd: '/p:',
          range: [
            -2,
            -1,
            0,
            1,
            2,
          ],
        },
      };
      break;
    default:
      break;
  }
}


/**
 * Send growl notification _msg_ with _options_.
 *
 * Options:
 *
 *  - title   Notification title
 *  - sticky  Make the notification stick (defaults to false)
 *  - priority  Specify an int or named key (default is 0)
 *  - name    Application name (defaults to growlnotify)
 *  - sound   Sound efect ( in OSx defined in preferences -> sound -> effects)
 *            works only in OSX > 10.8x
 *  - image
 *    - path to an icon sets --iconpath
 *    - path to an image sets --image
 *    - capitalized word sets --appIcon
 *    - filename uses extname as --icon
 *    - otherwise treated as --icon
 *
 * Examples:
 *
 *   growl('New email')
 *   growl('5 new emails', { title: 'Thunderbird' })
 *   growl('5 new emails', { title: 'Thunderbird', sound: 'Purr' })
 *   growl('Email sent', function(){
 *     // ... notification sent
 *   })
 *
 * @param {string} msg
 * @param {object} opts
 * @param {function} callback
 * @api public
 */

function growl(msg, opts, callback) {
  let image;
  const options = opts || {};
  const fn = callback || function noop() {};

  setupCmd();

  if (options.exec) {
    cmd = {
      type: 'Custom',
      pkg: options.exec,
      range: [],
    };
  }

  // noop
  if (!cmd) {
    fn(new Error('growl not supported on this platform'));
    return;
  }
  const args = [cmd.pkg];

  // image
  if (image || options.image) {
    image = options.image;
    switch (cmd.type) {
      case 'Darwin-Growl': {
        let flag;
        const ext = path.extname(image).substr(1);
        flag = ext === 'icns' && 'iconpath';
        flag = flag || (/^[A-Z]/.test(image) && 'appIcon');
        flag = flag || (/^png|gif|jpe?g$/.test(ext) && 'image');
        flag = flag || (ext && (image = ext) && 'icon');
        flag = flag || 'icon';
        args.push(`--${flag}`, image);
        break;
      }
      case 'Darwin-NotificationCenter':
        args.push(cmd.icon, image);
        break;
      case 'Linux':
        args.push(cmd.icon, image);
        // libnotify defaults to sticky, set a hint for transient notifications
        if (!options.sticky) args.push('--hint=int:transient:1');
        break;
      case 'Windows':
        args.push(cmd.icon + image);
        break;
      default:
        break;
    }
  }

  // sticky
  if (options.sticky) args.push(cmd.sticky);

  // priority
  if (options.priority) {
    const priority = `${options.priority}`;
    const checkindexOf = cmd.priority.range.indexOf(priority);
    if (checkindexOf > -1) {
      args.push(cmd.priority, options.priority);
    }
  }

  // sound
  if (options.sound && cmd.type === 'Darwin-NotificationCenter') {
    args.push(cmd.sound, options.sound);
  }

  // name
  if (options.name && cmd.type === 'Darwin-Growl') {
    args.push('--name', options.name);
  }

  switch (cmd.type) {
    case 'Darwin-Growl':
      args.push(cmd.msg);
      args.push(msg.replace(/\\n/g, '\n'));
      if (options.title) args.push(options.title);
      if (options.url) {
        args.push(cmd.url);
        args.push(options.url);
      }
      break;
    case 'Darwin-NotificationCenter': {
      args.push(cmd.msg);
      const stringifiedMsg = msg;
      const escapedMsg = stringifiedMsg.replace(/\\n/g, '\n');
      args.push(escapedMsg);
      if (options.title) {
        args.push(cmd.title);
        args.push(options.title);
      }
      if (options.subtitle) {
        args.push(cmd.subtitle);
        args.push(options.subtitle);
      }
      if (options.url) {
        args.push(cmd.url);
        args.push(options.url);
      }
      break;
    }
    case 'Linux-Growl':
      args.push(cmd.msg);
      args.push(msg.replace(/\\n/g, '\n'));
      if (options.title) args.push(options.title);
      if (cmd.host) {
        args.push(cmd.host.cmd, cmd.host.hostname);
      }
      break;
    case 'Linux':
      if (options.title) {
        args.push(options.title);
        args.push(cmd.msg);
        args.push(msg.replace(/\\n/g, '\n'));
      } else {
        args.push(msg.replace(/\\n/g, '\n'));
      }
      break;
    case 'Windows':
      args.push(msg.replace(/\\n/g, '\n'));
      if (options.title) args.push(cmd.title + options.title);
      if (options.url) args.push(cmd.url + options.url);
      break;
    case 'Custom': {
      const customCmd = args[0];
      const message = options.title
        ? `${options.title}: ${msg}`
        : msg;
      let command = customCmd.replace(/(^|[^%])%s/g, `$1${message}`);
      const splitCmd = command.split(' ');
      if (splitCmd.length > 1) {
        command = splitCmd.shift();
        Array.prototype.push.apply(args, splitCmd);
      }
      if (customCmd.indexOf('%s') < 0) {
        args.push(message);
      }
      args[0] = command;
      break;
    }
    default:
      break;
  }
  const cmdToExec = args.shift();

  const child = spawn(cmdToExec, args);
  let stdout = '';
  let stderr = '';
  let error;

  child.on('error', (err) => {
    console.error('An error occured.', err);
    error = err;
  });

  child.stdout.on('data', (data) => {
    stdout += data;
  });

  child.stderr.on('data', (data) => {
    stderr += data;
  });

  child.on('close', (code) => {
    error = error || code === 0 ? null : code;
    if (typeof fn === 'function') {
      fn(error, stdout, stderr);
    }
  });
}


/**
 * Expose `growl`.
 */

module.exports = growl;
