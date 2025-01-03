import NextAuth from "next-auth";
import { authOptions } from "@CS/web/utils/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
