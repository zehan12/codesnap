import directoryTree, { DirectoryTree } from "directory-tree";

// Define a type for the filtered tree
interface FilteredTree extends DirectoryTree {
    isFolder: boolean;
    children?: FilteredTree[];
}

// Directories to exclude
const excludeDirs = ["node_modules", ".git"];

/**
 * Recursively filters the directory tree to exclude unwanted directories.
 * @param tree - The original directory tree node.
 * @returns A filtered tree node with an added isFolder property.
 */
function filterTree(tree: DirectoryTree): FilteredTree {
    const filteredTree: FilteredTree = {
        ...tree,
        isFolder: !!tree.children,
        children: tree.children
            ? tree.children
                  .filter((child) => !excludeDirs.includes(child.name))
                  .map(filterTree)
            : undefined,
    };
    return filteredTree;
}

/**
 * Fetches the project structure as a filtered tree.
 * This function is marked as a server action to ensure it runs only on the server.
 * @returns The filtered directory tree.
 */
export async function getProjectStructure(): Promise<FilteredTree> {
    "use server"; // Server Action
    const directoryPath = process.cwd();
    const originalTree = directoryTree(directoryPath) as DirectoryTree;
    return filterTree(originalTree);
}
