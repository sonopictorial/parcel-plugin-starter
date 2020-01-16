const Path = require('path');
const fs = require('file-system');
// const fs = require('fs');
const chalk = require('chalk');
const { name } = require('./package.json');

const DEFAULTS = {
    dir: './'
}

module.exports = bundler => {
    const log = console.log;
    const plugName = name;

    const say = (msg, clr='white') => log(['#', plugName, '>', chalk.bold[clr](msg)].join(' '));
    const saveAs = (fn, fc) => fs.writeFileSync( fn, fc );

    let config = DEFAULTS
    let appConfig = require(Path.resolve('./package.json'));

    if(appConfig[plugName]) {
        config = { 
            ...DEFAULTS, 
            ...appConfig[plugName] 
        }
    }

    bundler.on('buildStart', entryPoints => {
        say('start', 'red');
        saveAs(config.dir + '/buildStart.json', '...');
    });

    bundler.on('bundled', bundle => {
        say('bundled', 'yellow');
        saveAs(config.dir + '/bundled.json', '...');
    });

    bundler.on('buildEnd', () => {
        say('end', 'green');
    });

    bundler.on('buildError', error => {
        say('err', 'red');
        say(error, 'red');
    });

};