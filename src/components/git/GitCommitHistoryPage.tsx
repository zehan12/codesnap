"use client"

import React, { useEffect, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { GitCommit, GitBranch, User } from "lucide-react"
import CommitCard from './CommitCard'

interface Commit {
    sha: string
    message: string
    date: string
    author: {
        name: string
        avatar: string
        username: string
    }
}

interface GitCommitHistoryPageProps {
    username: string
    repo: string
}

export const GitCommitHistoryPage = ({ username = "zehan12", repo = "codesnap" }: GitCommitHistoryPageProps) => {
    const [commits, setCommits] = useState<Commit[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
                }
                const data = await response.json()
                if (!Array.isArray(data)) {
                    throw new Error(`Invalid data format: expected an array, got ${typeof data}`)
                }
                const formattedCommits: Commit[] = data.map(commit => ({
                    sha: commit.sha,
                    message: commit.commit.message,
                    date: new Date(commit.commit.author.date).toLocaleString(),
                    author: {
                        name: commit.commit.author.name,
                        avatar: commit.author?.avatar_url || '',
                        username: commit.author?.login || ''
                    }
                }))
                setCommits(formattedCommits)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred.");
                }
            }
        }

        fetchData()
    }, [username, repo])

    if (error) {
        return <div className="container mt-3 text-red-500">Error: {error}</div>
    }

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <header className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <GitBranch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                {username} / {repo}
                            </h1>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                                <GitCommit className="w-4 h-4 mr-1" />
                                {commits.length} commits
                            </span>
                            <span className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {new Set(commits.map(c => c.author.username)).size} contributors
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-grow overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="max-w-screen-xl mx-auto">
                        {commits.map((commit, index) => (
                            <CommitCard
                                key={commit.sha}
                                commit={commit}
                                isLast={index === commits.length - 1}
                            />
                        ))}
                    </div>
                </ScrollArea>
            </main>
        </div>
    )
}