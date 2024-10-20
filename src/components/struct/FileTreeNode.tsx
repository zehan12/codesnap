"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FileText, Code, Image, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface TreeNode {
    name: string;
    path: string;
    size: number;
    type: "file" | "directory";
    children?: TreeNode[];
    isFolder: boolean;
}

const FileIcon: React.FC<{ name: string }> = ({ name }) => {
    if (name.endsWith(".tsx") || name.endsWith(".ts")) return <Code className="w-4 h-4 text-blue-500" />;
    if (name.endsWith(".css")) return <Code className="w-4 h-4 text-pink-500" />;
    if (name.endsWith(".json")) return <Code className="w-4 h-4 text-yellow-500" />;
    if (name.endsWith(".md")) return <FileText className="w-4 h-4 text-gray-500" />;
    if (/\.(jpg|png|svg|ico)$/.test(name)) return <Image className="w-4 h-4 text-green-500" />;
    if (name.startsWith(".")) return <File className="w-4 h-4 text-gray-400" />;
    return <File className="w-4 h-4 text-gray-500" />;
};

const FileTreeNode: React.FC<{ node: TreeNode; depth?: number }> = ({ node, depth = 0 }) => {
    const [isOpen, setIsOpen] = useState(depth === 0);

    const toggleOpen = () => {
        if (node.isFolder) setIsOpen(!isOpen);
    };

    return (
        <div>
            <div
                className={cn(
                    "flex items-center space-x-2 py-1 px-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800",
                    depth === 0 && "bg-gray-100 dark:bg-gray-800"
                )}
                style={{ paddingLeft: `${depth * 16 + 8}px` }}
                onClick={toggleOpen}
                aria-expanded={isOpen}
            >
                {node.isFolder &&
                    (isOpen ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                    ))}
                {node.isFolder ? (
                    <Folder className={cn("w-4 h-4", isOpen ? "text-yellow-500" : "text-gray-500")} />
                ) : (
                    <FileIcon name={node.name} />
                )}
                <span className="text-sm">{node.name}</span>
            </div>
            {isOpen && node.children && (
                <div>
                    {node.children.map((child) => (
                        <FileTreeNode key={child.path} node={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileTreeNode;
