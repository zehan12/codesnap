import { FC } from "react";

type ComingSoonProps = Record<string, never>; 

export const ComingSoon: FC<ComingSoonProps> = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
            <h1 className="text-5xl text-white font-bold mb-8 animate-pulse">
                Coming Soon
            </h1>
            <p className="text-white text-lg mb-8">
                We&apos;re working hard to bring you something amazing. Stay tuned!
            </p>
        </div>
    );
};
