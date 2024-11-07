import { Fragment, memo, useMemo, useRef, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks";

export const Menu = memo(() => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const menuRef = useRef<HTMLDivElement | null>(null);

    useOutsideClick(menuRef, () => setSelectedItem(null));

    const menuItems = useMemo(() => [
        { item: "Finder" },
        { item: "File" },
        { item: "Edit" },
    ], []);

    return (
        <div ref={menuRef}>
            <nav className="flex items-center px-2 bg-gradient-to-b">
                <ul className="flex">
                    <MenuDropdown
                        title="File"
                        items={[
                            { label: 'New', shortcut: '⌘N' },
                            { label: 'Open...', shortcut: '⌘O' },
                            { label: 'Save', shortcut: '⌘S' },
                            { label: 'Close', shortcut: '⌘W' },
                        ]}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                    />
                    <MenuDropdown
                        title="Edit"
                        items={[
                            { label: 'Undo', shortcut: '⌘Z' },
                            { label: 'Redo', shortcut: '⇧⌘Z' },
                            { label: 'Cut', shortcut: '⌘X' },
                            { label: 'Copy', shortcut: '⌘C' },
                            { label: 'Paste', shortcut: '⌘V' },
                        ]}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                    />
                    <MenuDropdown
                        title="View"
                        items={[
                            { label: 'Show Sidebar', shortcut: '⌘1' },
                            { label: 'Show Toolbar', shortcut: '⌘2' },
                            { label: 'Enter Full Screen', shortcut: '⌃⌘F' },
                        ]}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                    />
                    <MenuDropdown
                        title="Help"
                        items={[
                            { label: 'Welcome Guide' },
                            { label: 'Documentation' },
                            { label: 'Release Notes' },
                        ]}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                    />
                </ul>
            </nav>
        </div>
    );
});

function MenuDropdown({
    title,
    items,
    selectedItem,
    setSelectedItem,
}: {
    title: string;
    items: { label: string, shortcut?: string }[];
    selectedItem: string | null;
    setSelectedItem: (title: string | null) => void;
}) {
    const handleClick = (title: string) => {
        setSelectedItem((prev) => (prev === title ? null : title));
    };

    return (
        <li>
            <DropdownMenu>
                <DropdownMenuTrigger onPointerDown={() => handleClick(title)} asChild>
                    <button
                        className={cn(
                            "px-3 py-0.5 text-sm font-medium text-black rounded-md hover:bg-gray-50/25 focus:outline-none",
                            selectedItem === title ? "bg-gray-50/25" : ""
                        )}
                    >
                        {title}
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 p-1 bg-white/20  bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:bg-opacity-80">
                    {items.map((item, index) => (
                        <Fragment key={item.label}>
                            <DropdownMenuItem className="px-2 py-1 text-sm text-black rounded-md focus:bg-blue-500 focus:text-white dark:text-gray-300 dark:focus:bg-blue-600">
                                {item.label}
                                {item.shortcut && (
                                    <DropdownMenuShortcut className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                                        {item.shortcut}
                                    </DropdownMenuShortcut>
                                )}
                            </DropdownMenuItem>
                            {index < items.length - 1 && <DropdownMenuSeparator className="my-1 bg-gray-200 dark:bg-gray-700" />}
                        </Fragment>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </li>
    );
}
