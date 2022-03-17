import * as process from 'process';
import { join, basename } from 'path';
import { readdirSync, statSync, existsSync } from 'fs';


const rootPath = process.cwd();

const prefix = '__test__/demo-goods';

const goodsImageExt = join(rootPath, prefix, 'goods-image');
const readDir = (dir: string): string[] => {
	let res: string[] = [];
	readdirSync(dir).forEach(content => {
		const contentPath = join(dir, content);
		const stat = statSync(contentPath);
		if (stat.isDirectory()) {
			res.push(...readDir(contentPath))
		} else if (stat.isFile()) {
			res.push(contentPath);
		}
	})
	return res;
}

// console.log(readDir(goodsImageExt), existsSync(''));
console.log(basename('asdads/asdasd/helloworld.vue'))

// watch(join(rootPath, prefix, 'goods-image')).on("all", (eventName, path) => {
// 	console.log(eventName, path);
// });
//
//
// createFile(join(rootPath, prefix, 'retail-goods-image/dist/widgets/a.vue')).then(res => {
// 	console.log(res, 'create file');
// })
//
