import { Code } from "@/components/code-share/Code";
import Settings from "@/components/code-share/Settings";
import { SettingsProvider } from "@/providers";

export default function AppPage() {
    return (<>
        <SettingsProvider>
            <main className="h-full flex items-center justify-center flex-col gap-6">
                <h1 className="text-4xl font-black">Code Share</h1>
                <Code />
                <Settings />
            </main>
        </SettingsProvider>
    </>)
}