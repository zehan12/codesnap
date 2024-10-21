// src/components/CommitCard.js

import React from 'react';
import DOMPurify from 'dompurify';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { replaceEmojis } from '@/utils';

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

interface CommitCardProps {
    commit: Commit;
    isLast: boolean;
}

const CommitCard: React.FC<CommitCardProps> = ({ commit, isLast }) => {
    const processedMessage = replaceEmojis(commit.message.split('\n')[0]);
    const sanitizedMessage = DOMPurify.sanitize(processedMessage);

    return (
        <div
            className={`p-4 ${isLast ? "" : "border-b border-gray-200 dark:border-gray-700"} 
                  hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150`}
        >
            <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                    <AvatarImage src={commit.author.avatar} alt={commit.author.name || "User Avatar"} />
                    <AvatarFallback>{commit.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100" dangerouslySetInnerHTML={{ __html: sanitizedMessage }}></h3>
                    <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{commit.author.name}</span>
                        <span>committed on {commit.date}</span>
                        <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {commit.sha.substring(0, 7)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommitCard;
