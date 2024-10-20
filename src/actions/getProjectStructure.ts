import directoryTree from "directory-tree";
const excludeDirs = ["node_modules", ".git"];

function filterTree(tree: any) {
    if (tree.children) {
        tree.children = tree.children
            .filter((child: any) => !excludeDirs.includes(child.name))
            .map(filterTree);
        tree.isFolder = true;
    } else {
        tree.isFolder = false;
    }
    return tree;
}

export async function getProjectStructure() {
    "use server";
    const directoryPath = process.cwd();
    const originalTree = directoryTree(directoryPath);
    return filterTree(originalTree);
}
