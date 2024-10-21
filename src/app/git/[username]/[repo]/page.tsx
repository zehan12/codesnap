import { GitCommitHistoryPage } from "@/components/git";

interface DynamicGitPageProps {
    params: {
        username: string;
        repo: string;
    };
}

export default function DynamicGitPage({ params }: DynamicGitPageProps) {
    const { username, repo } = params;

    return <GitCommitHistoryPage username={username} repo={repo} />;
}
