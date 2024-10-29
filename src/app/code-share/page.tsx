import { Code } from "@/components/code-share/Code";
import { SettingsProvider } from "@/contexts";

export default function AppPage() {
    return (<>
        <SettingsProvider>
            <main className="h-full flex items-center justify-center flex-col gap-6">
                <h1 className="text-4xl font-black">Code Share</h1>
                <Code />
            </main>
        </SettingsProvider>
    </>)
}