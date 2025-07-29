import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

// App Router requires Request handler functions
const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
