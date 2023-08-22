// Data Structures: Binary Search Tree (BST)
/*
	Start: 8/19/23
	End: 8/22/23, 1:00 AM
*/

/**
 * Binary Search Tree class
 */
class Tree {
	/**
	 * Build a Binary Search Tree with `Array` of values
	 * @param {Array} arr - Array of values to build tree
	 */
	constructor(arr) {
		this.root = buildTree(arr, 0, arr.length - 1);
	}

	/**
	 * Insert a value into the tree
	 * @param {number | any} value - Value (Number) to insert
	 */
	insert = (value) => {
		// Check if Tree contains `value`
		if (this.contains(value)) return; // Dont add value twice

		let node = this.root;
		while (value > node.value) {
			if (node.right === null) node.right = new Node(value);

			else node = node.right;
		}

		while (value < node.value) {
			if (node.left === null) node.left = new Node(value);

			else node = node.left;
		}
	};

	/**
	 * Delete `value` from tree
	 * @param {number | any} value - Value to delete
	 */
	delete = (value) => {
		let node = this.root;
		let previous = this.root;
		// If value is Root
		if (value === node.value) {
			node = node.right;
			while (node.left != null) {
				previous = node;
				node = node.left;
			}

			if (previous !== this.root) {
				previous.left = node.right;
			}

			node.right = this.root.right;
			node.left = this.root.left;
			this.root = node;

			return;
		}

		while (true) {
			// If value is greater than Node
			if (value > node.value) {
				// Loop to next Node (right)
				previous = node;
				node = node.right;
			// If value is less than Node
			} else if (value < node.value) {
				// Loop to next Node (left)
				previous = node;
				node = node.left;
			// If value = Node
			} else if (value == node.value) {
				/* If prev is greater than Node AND Node has children,
				Means Nodes Right values (greater) go to
				Prev's left (less), and Node's left values (less than node)
				go to Prev's *new* left's left (less than new left) */
				// eslint-disable-next-line max-len
				if (previous.value > node.value && (node.right != null || node.left != null)) {
					previous.left = node.right;
					previous.left.left = node.left;
				/* If Prev is less than Node AND Node has children,
				Means Node's right values (greater) go to
				Prev's right (greater), and Node's left values (less than Node)
				go to Prev's *new* right's left (less than new right) */
				// eslint-disable-next-line max-len
				} else if (previous.value < node.value && (node.right != null || node.left != null)) {
					previous.right = node.right;
					previous.right.left = node.left;
				/* Else, Node doesn't have children,
				For some reason doesn't work if Node's children = `null` so
				I have to check and do it differently */
				} else {
					/* If Prev is less than Node AND both Node's children are null,
					Set Prev's right to null (delete Node) */
					if (previous.value < node.value &&
					node.right == null && node.left == null) {
						previous.right = null; // Delete `Node`
					/* If Prev is *greater* than Node AND both Node's children are null
					Set Prev's left to null (delete Node) */
					} else if (previous.value > node.value &&
					node.right == null && node.left == null) {
						previous.left = null; // Delete `Node`
					/* If Prev is *greater* than Node AND Right child is null */
					} else if (previous.value > node.value &&
					node.right == null && node.left != null) {
						previous.left = node.left;
					/* If Prev is *greater* than Node AND Left child is null */
					} else if (previous.value > node.value &&
					node.right != null && node.left == null) {
						previous.left = node.right;
					/* If Prev is *less* than Node AND Right child is null */
					} else if (previous.value < node.value &&
					node.right == null && node.left != null) {
						previous.right = node.left;
					/* If Prev is *less* than Node AND Left child is null */
					} else if (previous.value < node.value &&
					node.right != null && node.left == null) {
						previous.right = node.right;
					}
				}
				break;
			}
		}
	};

	/**
	 * Check if Tree contains value
	 * @param {number | any} value - Value to check
	 * @param {Node} check - Node to check (leave blank to run through whole tree)
	 *
	 * @return {boolean}
	 */
	contains = (value, check = this.root) => {
		// Base Cases
		if (check === null) return false;
		else if (value == check.value) return true;

		// Check if value is greater than or less than check
		// Call function again with the left or right Node
		else if (value < check.value) {
			return this.contains(value, check.left);
		} else if (value > check.value) {
			return this.contains(value, check.right);
		}
	};

	/**
	 * Find a value within Tree
	 *
	 * @param {number | any} value - Value to find
	 *
	 * @return {Node | null} Node with the given value - `null` if not found
	 */
	find = (value) => {
		let node = this.root;
		while (true) {
			if (node == null) return null;
			else if (node.value > value) node = node.left;
			else if (node.value < value) node = node.right;
			else if (node.value == value) return node;
		}
	};

	/**
	 * Traverse the tree in 'level order' and place the current `Node`
	 * as a parameter to the given callback function.
	 * If no callback is given, return an Array of values
	 * (iterative approach)
	 *
	 * @param {Function} callback - A callback function whos parameter
	 * will be each node in the tree
	 *
	 * @return {void | Array} Nothing | An `Array` of values
	 */
	iterLevelOrder = (callback) => {
		const queue = [];
		const array = []; // Array of values to be returned if no callback is given
		let node = this.root;

		while (true) {
			// Push children to queue
			if (node.left != null) queue.push(node.left);
			if (node.right != null) queue.push(node.right);

			// If a callback is given
			if (callback != undefined) {
				callback(node);
			} else {
				array.push(node);
			}

			// If nothing is in the queue and current Node has no children,
			// Break loop
			if (queue.length === 0 && node.left === null && node.right === null) {
				if (callback == undefined) return array;
				break;
			}

			// Set node to first Node in the queue
			node = queue.shift();
		}
	};

	/**
	 * Traverse the Tree in level order and place the current `Node` as the
	 * parameter for the given callback function, if no callback is given,
	 * return Array of values (recursive approach)
	 *
	 * @param {Function} [callback] - Callback Function to which the parameter
	 * will be the current node
	 * - (optional)
	 * @param {Node} node - Current Node
	 * - Used for recursive calls
	 * - Do not worry about it
	 * @param {Array} queue - Queue of Nodes to record
	 * - Used for recursive calls
	 *
	 * @return {void | Array} Returns array of values if no callback is given
	 */
	recurLevelOrder = (callback, node = this.root, queue = []) => {
		const array = []; // Return array of values if no callback is given

		// Push children to queue
		if (node.left != null) queue.push(node.left);
		if (node.right != null) queue.push(node.right);

		// If a callback is given
		if (callback != undefined) {
			callback(node);
			// Base 1
			if (queue.length === 0) return;
			// Else, call function recursively with next node in queue
			else return this.recurLevelOrder(callback, queue.shift(), queue);
		} else {
			// If no callback, push node to array
			array.push(node);

			// Base 2
			if (queue.length === 0) return array;
			else {
				// Call function recursively and return the concattenated Arrays
				return array.concat(
					this.recurLevelOrder(callback, queue.shift(), queue),
				);
			}
		}
	};

	/**
	 * Traverse the Tree, depth first, In Order
	 * - Left, root, right
	 * - The `Node`'s will be passed into the callback
	 * @param {Function} callback - Callback function to which the parameter
	 * will be every Node in order
	 * @param {Node} node - Current Node
	 * - Used for recursion, do not worry about this
	 * @param {Array} [arr] An array of values
	 * - Used for recursion
	 * @return {Array} An array of whatever `callback` returns when
	 * `node` is passed into it
	 */
	inorder = (callback, node = this.root, arr = []) => {
		// Base case
		if (node == null) return;

		// First, go to left
		this.inorder(callback, node.left, arr);

		// Next, run callback on root
		if (callback !== undefined) arr.push(callback(node));
		else arr.push(node.value);

		// Then, go to right
		this.inorder(callback, node.right, arr);

		return arr;
	};

	/**
	 * Traverse the Tree, depth first, preorder
	 * - Root, left, right
	 *
	 * @param {Function} callback - Callback function to be called with every node
	 * - The parameter for `callback` will be the `Node`
	 * @param {Node} node - The current node
	 * - Used for recursion, do not worry about this
	 * @param {Array} [arr] An array of values
	 * - Used for recursion
	 *
	 * @return {Array} An array of whatever `callback` returns when
	 * `node` is passed into it
	 */
	preorder = (callback, node = this.root, arr = []) => {
		if (node == null) return;

		// First, run callback on root
		if (callback != undefined) arr.push(callback(node));
		else arr.push(node.value);

		// Next, go to left
		this.preorder(callback, node.left, arr);

		// Then, go to right
		this.preorder(callback, node.right, arr);

		return arr;
	};

	/**
	 * Traverse the Tree, depth first, postorder
	 * - Left, right, root
	 *
	 * @param {Function} callback - Callback function to be called with every node
	 * - The parameter for `callback` will be the `Node`
	 * @param {Node} node - The current node
	 * - Used for recursion, do not worry about this
	 * @param {Array} [arr] An array of values
	 * - Used for recursion
	 *
	 * @return {Array} An array of whatever `callback` returns when
	 * `node` is passed into it
	 */
	postorder = (callback, node = this.root, arr = []) => {
		// Base Case
		if (node == null) return;

		// First, go to left
		this.postorder(callback, node.left, arr);

		// Next, go to right
		this.postorder(callback, node.right, arr);

		// Then, run callback on root
		if (callback != undefined) arr.push(callback(node));
		else arr.push(node.value);

		return arr;
	};

	/**
	 * Get the height of the given `Node`
	 * - Height: Number of edges, in longest path, from the `Node`
	 * to a leaf node (one without children)
	 *
	 * @param {number | Node} node Node to get the height of
	 * @param {number} [height] Current height
	 * - Used for recursion
	 *
	 * @return {number}
	 */
	height = (node, height = 1) => {
		if (typeof node == 'number') node = this.find(node);

		if (node === null) {
			return 0; // Height of an empty node is 0
		}

		const leftHeight = this.height(node.left, height + 1);
		const rightHeight = this.height(node.right, height + 1);

		// Return the maximum of leftHeight and rightHeight,
		// plus 1 for the current node
		return Math.max(leftHeight, rightHeight) + 1;
	};

	/**
	 * Get the depth of the given `Node`
	 * - Depth: Number of edges from a given `Node` and its root node
	 *
	 * @param {Node | number} node Node to find depth of
	 * - Can be the value of node or the actual Node
	 *
	 * @return {number | null}
	 */
	depth = (node) => {
		// Change number into node
		if (typeof node == 'number') node = this.find(node);
		// If no Node exists, return null
		if (node == null) return null;

		let current = this.root;
		let depth = 0;
		while (true) {
			// If no node, return `null`
			if (current == null) return null;
			// Move down the tree if node is lower
			if (current.value > node.value) current = current.left;
			// Move up the tree if node is greater
			else if (current.value < node.value) current = current.right;
			// Return depth if node is found
			else if (current.value == node.value) return depth;
			depth++; // increment depth with each loop
		}
	};

	/**
	 * Check if tree is balanced
	 * - A balanced tree is one where the difference between
	 * heights of left subtree and right subtree of every node is not more than 1
	 *
	 * @param {Node} node Root of tree
	 *
	 * @return {boolean}
	 */
	isBalanced = (node = this.root) => {
		if (node === null) return true;

		// Calc height of left and right subtrees
		const left = this.height(node.left);
		const right = this.height(node.right);

		// Check if current nodes subtree is balanced
		if (Math.abs(left - right) > 1) return false;

		// Recursively check balance for left and right sub-subtrees
		return this.isBalanced(node.left) && this.isBalanced(node.right);
	};

	rebalance = () => {
		this.root = buildTree(this.inorder());
	};

	/**
	 * Pretty Print the BTS to the console
	 * for visualization
	 * @author TOP
	 * Note: Slightly edited to work in my `Tree` class
	 *
	 * @param {Node} node - Root Node / Current Node
	 * @param {string} prefix
	 * @param {boolean} isLeft - Is left?
	 * @return {void}
	 */
	prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			// eslint-disable-next-line max-len
			this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}
	};
}

/**
 * Build a Binary Search Tree with the given
 * array of data. Array should be sorted
 *
 * @param {Array} arr - Array of data
 * @param {number | string} start - Start index of Array
 * @param {number | string} end - End index of Array
 *
 * @return {Node} `Node` Object
 */
const buildTree = (arr, start = 0, end = arr.length - 1) => {
	// Base Case
	if (start > end) return null;

	// Get middle element
	const mid = parseInt((start + end) / 2);
	const node = new Node(arr[mid]);

	/* Recursively construct left subtree and
	make it left child of `node` */
	node.left = buildTree(arr, start, mid - 1);
	/* Recursively construct right subtree and
	make it the right child of `node` */
	node.right = buildTree(arr, mid + 1, end);

	return node;
};

/**
 * Node class constructor
 */
class Node {
	/**
	 * Node will hold `value` in the Binary Search Tree.
	 * Will have `left` and `right` attributes for Nodes children in tree
	 * @param {number | any} value - Value `Node` will hold
	 */
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

const script = () => {
	// Get array of 20 random numbers < 100
	const arr = [];
	for (let i = 0; i < 20; i++) {
		arr.push(Math.floor(Math.random() * 99));
	}

	arr.sort();

	// Create Tree
	const tree = new Tree(arr);

	tree.prettyPrint();

	// Confirm tree is balanced
	console.log('Is balanced: ', tree.isBalanced());

	// Print out all elements
	console.log('Level Order: ', tree.iterLevelOrder());
	console.log('Preorder: ', tree.preorder());
	console.log('Postorder: ', tree.postorder());
	console.log('Inorder: ', tree.inorder());

	// Unbalance tree by adding numbers > 100
	for (let i = 0; i < 5; i++) {
		tree.insert(Math.floor((Math.random() * 10) + 100));
	}

	// Confirm tree is unbalanced
	console.log('Is balanced: ', tree.isBalanced());
	// Rebalance
	console.log('Rebalanced');
	tree.rebalance();
	// Confirm rebalanced
	console.log('Is balanced: ', tree.isBalanced());

	// Print out all elements
	console.log('Level Order: ', tree.iterLevelOrder());
	console.log('Preorder: ', tree.preorder());
	console.log('Postorder: ', tree.postorder());
	console.log('Inorder: ', tree.inorder());
};

script();
