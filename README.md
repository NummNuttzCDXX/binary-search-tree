# binary-search-tree
TOP Assignment demonstrating creation and implementation of Binary Search Trees

## Description
A Binary Search Tree (BST) is a data structure where each left node is 'lower' and each right node is 'higher'. The tree starts with a root node and a node with no children is called a 'leaf'. A BST is used for fast lookup, deletion, and insertion of values. I created two classes, one for `Node`'s and another for the `Tree`. The `Tree` holds plenty of methods for data lookup and manipulation.

## Methods
- Traversal
	- Level Order: Traverse the tree starting at the root and go from across, reading from level to level until you hit the bottom
	- Preorder: Traverse the tree from the root, to left node, to right node. Then youll follow the same formula with the left node. You read left node, then move to its left node, then its left node ..etc, if there is no left node then youll move to the right nodes.
	- Inorder: Same as preorder but with this formula, start with the left node, then the root, then the right node. So you will start with the trees root, move to the left node, then its left node all the way down until the current node has no left node, then read the current root, then move to the right.
	- Postorder: Same as others but youll start with left node, then right node, then the root
- Insert
- Delete
- Find: Find and return `Node` holding the given value
- Contains: check if `Tree` contains a value
- Height: Get the height of a node
- Depth: Get the depth of a node
- isBalanced: Check if tree is balanced
- rebalance: Rebalances the tree

## Learned Skills
I've gained a better understanding of recursive methods and when it's a good idea to use them. Along with learning about a new data structure to utilize, the binary search tree.
