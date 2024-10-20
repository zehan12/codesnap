import { getProjectStructure } from "@/actions";
import FileTreeNode from "@/components/struct/FileTreeNode";

export default async function ProjectStructurePage() {
    const projectStructure = await getProjectStructure();

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
            <header className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Project Structure
                </h1>
            </header>
            <main className="flex-grow overflow-hidden">
                <div className="h-full p-4">
                    {projectStructure ? (
                        <FileTreeNode node={projectStructure} />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}