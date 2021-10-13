const gulp = require('gulp')
const rollup = require('rollup')
const clean = require('gulp-clean')
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;

const copy = require('rollup-plugin-copy');
const rollupTypescript = require('rollup-plugin-typescript2')

gulp.task('clean', function () {
	return gulp
		.src('lib', { read: false, allowEmpty: true })
		.pipe(clean('lib'));
});



gulp.task('clean-js', function () {
	return gulp
		.src('lib/**/*.js', { read: false })
		.pipe(clean('*.js'));
});


gulp.task("build", async function () {
	const esmTask = await rollup.rollup({
		input: "src/index.ts",
		output: {
			file: 'lib/index.js',
			format: 'esm', //iife
			extend: true,
			name: 'index'
		},
		plugins: [
			rollupTypescript({
				typescript: require('ttypescript'),
				tsconfigDefaults: {
					compilerOptions: {
						plugins: [
							{ "transform": "typescript-transform-paths" },
							{ "transform": "typescript-transform-paths", "afterDeclarations": true }
						]
					}
				}
			}),
			// copy({
			// 	targets: [
			// 		{ src: 'src/core/base/common/performance.d.ts', dest: 'lib/core/base/common' }
			// 	]
			// })
		]
	});
	const cjsTask = await rollup.rollup({
		input: "src/index.ts",
		output: {
			file: 'lib/index.js',
			format: 'cjs', //iife
			extend: true,
			name: 'index'
		},
		plugins: [
			rollupTypescript({
				typescript: require('ttypescript'),
				tsconfigDefaults: {
					compilerOptions: {
						plugins: [
							{ "transform": "typescript-transform-paths" },
							{ "transform": "typescript-transform-paths", "afterDeclarations": true }
						]
					}
				}
			})
		]
	});
	await esmTask.write({
		file: 'lib/index.mjs',
		format: 'esm', //iife
		extend: true,
		name: 'index'
	});
	await cjsTask.write({
		file: 'lib/index.js',
		format: 'cjs', //iife
		extend: true,
		name: 'index'
	})
});

gulp.task("uglify", function () {
	return gulp.src("lib/*.js")
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify(/* options */))
		.pipe(gulp.dest("lib/"));
});

gulp.task('default'
	, gulp.series(
		gulp.parallel('clean'),
		gulp.parallel('clean-js'),
		gulp.parallel('build'),
		gulp.parallel('uglify')
	)
)
