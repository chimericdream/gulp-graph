var fs = require('fs');
var shell = require('gulp-shell');


module.exports = function(gulp, options) {
    var opts = {
        'dotfile': options.dotfile || 'gulp.dot',
        'pngfile': options.pngfile || 'gulp.png'
    };

    gulp.task('graphGenerate', function () {

        var dot = 'digraph g {\n';

        var tree = require('gulp/lib/taskTree')(this.tasks);

        tree.nodes.forEach(function (node) {
            dot += '"' + node.label + '";\n';
        });

        dot += '\n';

        tree.nodes.forEach(function (node) {
            node.nodes.forEach(function (dep) {
                dot += '"' + dep + '" -> "' + node.label + '";\n';
            });
        });

        dot += '}\n';

        fs.writeFileSync(opts.dotfile, dot);
    });

    gulp.task('graph', ['graphGenerate'], shell.task([
        'dot -Tpng ' + opts.dotfile + ' > ' + opts.pngfile
    ]));

};
