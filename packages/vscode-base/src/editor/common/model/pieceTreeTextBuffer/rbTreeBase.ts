

export class TreeNode {
	parent: TreeNode;
	left: TreeNode;
	right: TreeNode;
	color: NodeColor;
}


export const enum NodeColor {
	Black = 0,
	Red = 1,
}
