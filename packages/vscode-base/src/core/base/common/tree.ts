import { IDisposable, toDisposable } from '@/core/base/common/lifecycle';

export class Node<T> {
	static readonly Undefined = new Node<any>(undefined);
	public left: Node<T>;
	public right: Node<T>;

	constructor(public element: T) {
		this.left = Node.Undefined;
		this.right = Node.Undefined;
	}

	toString() {
		return `${this.element}`;
	}
}

interface ICompareFunction<T> {
	(a: T, b: T): Compare;
}

interface ITraverseCallbackFunction<T> {
	(element: T): void;
}

enum Compare {
	EQUALS = 1,
	BIGGER_THAN,
	LESS_THAN,
}

export function defaultCompare<T>(a:T, b:T) {
	if (a === b){
		return Compare.EQUALS;
	}else if(a > b) {
		return Compare.BIGGER_THAN;
	}else {
		return Compare.LESS_THAN;
	}
}

export class BinarySearchTree<T> {

	protected root: Node<T>;

	constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
		this.root = Node.Undefined;
	}

	public insert(element: T): IDisposable {
		if (this.root === Node.Undefined) {
			this.root = new Node(element);
		} else {
			this.root = this._insertNode(this.root, element);
		}
		let hasRemoved = false;
		return toDisposable(() => {
			if (!hasRemoved) {
				this._removeNode(this.root, element);
			}
		})
	}

	protected _insertNode(node: Node<T>, element: T): Node<T> {
		if (this.compareFn(element, node.element) === Compare.LESS_THAN) {
			if (node.left === Node.Undefined) {
				node.left = new Node(element);
			} else {
				this._insertNode(node.left, element);
			}
		} else {
			if (node.right === Node.Undefined) {
				node.right = new Node(element);
			} else {
				this._insertNode(node.right, element);
			}
		}
		return node;
	}

	public search(element: T): Node<T> {
		return this._searchNode(this.root, element);
	}

	private _searchNode(node: Node<T>, element: T): Node<T> {
		if (node === Node.Undefined) {
			return Node.Undefined;
		}
		if (this.compareFn(element, node.element) === Compare.LESS_THAN) {
			return this._searchNode(node.left, element);
		} else if (this.compareFn(element, node.element) === Compare.BIGGER_THAN) {
			return this._searchNode(node.right, element);
		} else {
			return node;
		}
	}

	public max(): T {
		return this._maxNode(this.root).element;
	}

	private _maxNode(node: Node<T>): Node<T> {
		let current = node;
		while (current !== Node.Undefined && current.right !== Node.Undefined) {
			current = current.right;
		}
		return current;
	}

	public min(): T {
		return this._minNode(this.root).element;
	}

	private _minNode(node: Node<T>): Node<T> {
		let current = node;
		while (current !== Node.Undefined && current.left !== Node.Undefined) {
			current = current.left;
		}
		return current;
	}

	public remove(element: T): Node<T> {
		this.root = this._removeNode(this.root, element);
		return this.root;
	}

	protected _removeNode(node: Node<T>, element: T): Node<T> {
		if (node === Node.Undefined) {
			return node;
		}
		if (this.compareFn(element, node.element) === Compare.LESS_THAN) {
			node.left = this._removeNode(node.left, element);
			return node;
		} else if (this.compareFn(element, node.element) === Compare.BIGGER_THAN) {
			node.right = this._removeNode(node.right, element);
			return node;
		} else {
			// equals
			if (node.left === Node.Undefined && node.right === Node.Undefined) {
				node = Node.Undefined;
				return node;
			}
			if (node.left === Node.Undefined) {
				node = node.right;
				return node;
			} else if (node.right === Node.Undefined) {
				node = node.left;
				return node;
			}

			const minNodeOfRight = this._minNode(node.right);
			node.element = minNodeOfRight.element;
			node.right = this._removeNode(node.right, minNodeOfRight.element);
			return node;
		}
	}

	public inOrderTraverse(cb: ITraverseCallbackFunction<T>): void {
		this._inOrderTraverseNode(this.root, cb);
	}

	private _inOrderTraverseNode(node: Node<T>, cb: ITraverseCallbackFunction<T>): void {

		if (node === Node.Undefined) return;

		this._inOrderTraverseNode(node.left, cb);
		cb(node.element);
		this._inOrderTraverseNode(node.right, cb);
	}

	public preOrderTraverse(cb: ITraverseCallbackFunction<T>): void {
		this._preOrderTraverseNode(this.root, cb);
	}

	private _preOrderTraverseNode(node: Node<T>, cb: ITraverseCallbackFunction<T>): void {

		if (node === Node.Undefined) return;

		cb(node.element);
		this._preOrderTraverseNode(node.left, cb);
		this._preOrderTraverseNode(node.right, cb);
	}

	public postOrderTraverse(cb: ITraverseCallbackFunction<T>): void {
		this._postOrderTraverseNode(this.root, cb);
	}

	private _postOrderTraverseNode(node: Node<T>, cb: ITraverseCallbackFunction<T>): void {
		if (node === Node.Undefined) return;

		this._postOrderTraverseNode(node.left, cb);
		this._postOrderTraverseNode(node.right, cb);
		cb(node.element);
	}

}


enum BalanceFactor {
	UNBALANCED_RIGHT = 1,
	SLIGHTLY_UNBALANCED_RIGHT = 2,
	BALANCED = 3,
	SLIGHTLY_UNBALANCED_LEFT = 4,
	UNBALANCED_LEFT = 5,
}

export class AVLTree<T> extends BinarySearchTree<T> {

	constructor(protected comparedFn: ICompareFunction<T> = defaultCompare) {
		super(comparedFn);
	}

	private _getNodeHeight(node: Node<T>): number {
		return AVLTree.getNodeHeight(node);
	}

	private static getNodeHeight(node: Node<any>): number {
		if (node === Node.Undefined) return -1;
		return Math.max(AVLTree.getNodeHeight(node.left), AVLTree.getNodeHeight(node.right)) + 1;
	}

	private _getBalanceFactor(node: Node<T>): BalanceFactor {
		const heightDifference = this._getNodeHeight(node.left) - this._getNodeHeight(node.right);
		switch (heightDifference) {
			case -2:
				return BalanceFactor.UNBALANCED_RIGHT;
			case -1:
				return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
			case 1:
				return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
			case 2:
				return BalanceFactor.UNBALANCED_LEFT;
			default:
				return BalanceFactor.BALANCED;
		}
	}
	/**
	 * 左左情况: 向右的单旋转
	 *
	 *      b                            a
	 *     / \                          / \
	 *    a   e -> rotationLL(b) ->    c   b
	 *   / \                              / \
	 *  c   d                            d   e
	 *
	 * @param node
	 */
	private _rotationLL(node: Node<T>): Node<T> {
		const tmp = node.left;
		node.left = tmp.right;
		tmp.right = node;
		return tmp;
	}

	/**
	 * 右右情况: 向左的单旋转
	 *
	 *      a                            b
	 *     / \                          / \
	 *    c   b -> rotationRR(a) ->    a   e
	 *       / \                      / \
	 *      d   e                    c   d
	 * @param node
	 */
	private _rotationRR(node: Node<T>): Node<T> {
		const tmp = node.right;
		node.right = tmp.left;
		tmp.left = node;
		return tmp;
	}

	/**
	 * 右侧节点的左节插入新节点后，导致了不平衡，是为RL
	 * 先对node.right进行左旋
	 * 左右情况: 向右的双旋转, 先向右旋转然后向左旋转
	 *
	 *
	 *      70(node)                             70 (node)                         72
	 *     / \                                  /   \                            /   \
	 *    50  80 -> rotationLL(node.right) ->  50   72-> rotationRR(node) ->   70   80
	 *       / \                                     \                        /     / \
	 *      72   90                                   80                    50    75  90
	 *       \                                       / \
	 *        75                                   75   90
	 * @param node
	 */
	private _rotationRL(node: Node<T>): Node<T> {
		node.right = this._rotationLL(<Node<T>>node.right);
		return this._rotationRR(node);
	}

	/**
	 * 左右情况: 向右的双旋转, 先向右旋转然后向左旋转
	 *
	 *      50(node)                             50                                 40
	 *     / \                                  /   \                              /  \
	 *    30  70 -> rotationLL(node.left) ->  40   70   -> rotationRR(node) ->   30   50
	 *   / \                                 /                                   / \     \
	 * 10   40                              30                                  10  35    70
	 *     /                               / \
	 *    35                              10  35
	 * @param node
	 */
	private _rotationLR(node: Node<T>): Node<T> {
		node.left = this._rotationRR(node.left);
		return this._rotationLL(node);
	}


	public override insert(element: T): IDisposable {
		if (this.root === Node.Undefined) {
			this.root = new Node(element);
		} else {
			this.root = this._insertNode(this.root, element);
		}
		let hasRemoved = false;
		return toDisposable(() => {
			if (!hasRemoved) {
				this._removeNode(this.root, element);
			}
		})
	}

	protected override _insertNode(node: Node<T>, element: T): Node<T> {
		if (node === Node.Undefined) {
			return new Node(element);
		}
		if (this.compareFn(element, node.element) === Compare.LESS_THAN) {
			node.left = this._insertNode(node.left, element);
		} else if (this.compareFn(element, node.element) === Compare.BIGGER_THAN) {
			node.right = this._insertNode(node.right, element);
		} else {
			return node; // 重复的键
		}

		const balanceState = this._getBalanceFactor(node);
		if (balanceState === BalanceFactor.UNBALANCED_LEFT) {
			// #LL
			if (this.comparedFn(element, node.left.element) === Compare.LESS_THAN) {
				node = this._rotationLL(node);
			} else {
				// #LR
				node = this._rotationLR(node);
			}
		}
		if (balanceState === BalanceFactor.UNBALANCED_RIGHT) {
			if (this.compareFn(element, <T>node.right.element) === Compare.BIGGER_THAN) {
				// 小于则进行RR旋转
				node = this._rotationRR(node);
			} else {
				// 否则进行RL旋转
				node = this._rotationRL(node);
			}
		}
		return node;
	}

	protected override _removeNode(node: Node<T>, element: T): Node<T> {
		super._removeNode(node, element);
		const balanceState = this._getBalanceFactor(this.root);

		if (balanceState === BalanceFactor.UNBALANCED_LEFT) {
			const balanceFactorOfLeft = this._getBalanceFactor(node.left);
			if (balanceFactorOfLeft === BalanceFactor.BALANCED || balanceFactorOfLeft === BalanceFactor.UNBALANCED_LEFT) {
				return this._rotationLL(node);
			}
			if (balanceFactorOfLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
				return this._rotationLR(node.left);
			}
		}

		if (balanceState === BalanceFactor.UNBALANCED_RIGHT) {
			const balanceFactorOfLeft = this._getBalanceFactor(node.right);
			if (balanceFactorOfLeft === BalanceFactor.BALANCED || balanceFactorOfLeft === BalanceFactor.UNBALANCED_RIGHT) {
				return this._rotationLL(node);
			}
			if (balanceFactorOfLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
				return this._rotationRL(node.right);
			}
		}
		return node;
	}

}





