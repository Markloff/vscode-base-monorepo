
enum ExtensionContentType {
	Widget = 1,
	Component,
	ExtensionJson,
	PackageJson,
	DeclareFile,
	EntryFile,
	Other
}

class ExtensionContentPath {

	private readonly _path: string;

	constructor(path: string) {
		this._path = path;
	}

	toString(): string {
		return this._path;
	}

	static prefer(one: ExtensionContentPath, another: ExtensionContentPath): boolean {

	}

	beyondRoot(path: ExtensionContentPath): boolean {
		return ExtensionContentPath.prefer(this, path);
	}
}



interface IExtensionFile {
	configPath: ExtensionContentPath;
	type: ExtensionContentType;
	content: string;
}

interface IExtensionFileOptions {
	content: string;
	path: string;
}


interface IWriter {

}

class BaseExtensionFile implements IExtensionFile {

	readonly type: ExtensionContentType;
	readonly content: string;
	readonly configPath: ExtensionContentPath;

	constructor(options: IExtensionFileOptions) {
		this.type = ExtensionContentType.Other;
		this.configPath = new ExtensionContentPath(options.path);
		this.content = options.content;
	}

}

class WidgetFile extends BaseExtensionFile {
	readonly type: ExtensionContentType;
	constructor() {
		this.type = ExtensionContentType.Widget;

	}

}

// readonly
class Extension {
	rootEntry: ExtensionContentPath;
	widgets: WidgetFile[];
	components: ComponentFile[];
	config: ExtensionConfig[];
	typeDeclare: TypeDeclare[];
	dependencyDeclare: PackageJson[];

	overload(extension: Extension): Extension {

	}

	toDiskContent(): IExtensionFile[] {
		return [];
	}

	dispose() {

	}
}

class Reconcile {
	extensions: Extension[];
}


class Writer {
	prevFiles: IExtensionFile[];

	write(files: IExtensionFile[]) {
		// TODO
	}
}

