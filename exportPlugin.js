const crypto = require('crypto');

module.exports = class ExportPlugin {
    apply(compiler) {
        compiler.plugin('emit', (compilation, done) => {
            const headerTemplate = `define("${compiler.options.output.library}", [], function() { return { start: function(options) { return new Promise(function(resolve) {`;
            const importTemplate = `System.import("{{replacement}}")`;
            const footerTemplate = `.then(function(mod) { resolve(mod.default.start({el: options.el, config: options.config}))})`;
            const mainTemplate = `.then(function () { return System.import("{{replacement}}")})`;
            compilation.chunks.forEach(chunk => {
                let bootloader = headerTemplate;
                bootloader += importTemplate.replace('{{replacement}}', compiler.options.output.publicPath + chunk.files[0]);
                bootloader += footerTemplate;
                bootloader += mainTemplate.replace('{{replacement}}', compiler.options.output.publicPath + chunk.files[0]);
                bootloader += `; }); } }; });`;
                const hash = crypto.createHash('md5');
                hash.update(bootloader);
                compilation.assets[`${chunk.name}-bootloader-${hash.digest("hex")}.js`] = {
                    source: _ => bootloader,
                    size: _ => bootloader.length
                }
            });
            done()
        })
    }
};
