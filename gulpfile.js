/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const through = require('through2');

function generatePackageJSON() {
  return gulp
    .src('./package.json')
    .pipe(
      through.obj((file, enc, cb) => {
        const rawJSON = file.contents.toString();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const parsed = JSON.parse(rawJSON);
        delete parsed.scripts;
        delete parsed.devDependencies;
        delete parsed.publishConfig;
        delete parsed.files;
        delete parsed.resolutions;
        delete parsed.packageManager;
        delete parsed.jest;

        //
        const distKeys = ['main', 'types', 'module', 'amd', 'iife', 'umd', 'umdMin'];
        for (const key of distKeys) {
          if (parsed[key]) {
            parsed[key] = parsed[key].replace(/\.\/dist\/|dist\//, '');
          }
        }

        const exportsObj = {};
        for (const key in parsed.exports) {
          exportsObj[key] = parsed.exports[key].replace(/\.\/dist\/|dist\//, './');
        }
        parsed.exports = exportsObj;

        delete parsed.amd;
        delete parsed.iife;
        delete parsed.umd;
        delete parsed.umdMin;

        const stringified = JSON.stringify(parsed, null, 2);
        file.contents = Buffer.from(stringified);
        cb(null, file);
      }),
    )
    .pipe(gulp.dest('./dist/'));
}

function copyFile() {
  return gulp
    .src(['README.md', 'CHANGELOG.md', 'LICENSE', 'public/index.html'], { allowEmpty: true })
    .pipe(gulp.dest('dist'));
}

exports.default = gulp.series(generatePackageJSON, copyFile);
