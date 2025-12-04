import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import MicrosoftEntraIDProvider from 'next-auth/providers/microsoft-entra-id';
import prisma from './prisma';

const buildWorkspacePayload = async (userId: string) => {
  const memberships = await prisma.membership.findMany({
    where: { userId },
    include: { workspace: true },
    orderBy: { createdAt: 'asc' },
  });

  const workspaces = memberships.map((membership) => ({
    id: membership.workspaceId,
    name: membership.workspace.name,
    role: membership.role,
  }));

  return {
    workspaces,
    activeWorkspaceId: workspaces[0]?.id ?? null,
  };
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    MicrosoftEntraIDProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID ?? '',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? '',
      tenantId: process.env.AZURE_AD_TENANT_ID ?? 'common',
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? '';
        session.user.activeWorkspaceId = (token as any).activeWorkspaceId ?? null;
        session.user.workspaces = ((token as any).workspaces ?? []) as {
          id: string;
          name: string;
          role: string;
        }[];
      }
      return session;
    },
    async jwt({ token, trigger }) {
      if (!token.sub) return token;

      if (trigger === 'signIn' || !(token as any).workspaces) {
        const workspacePayload = await buildWorkspacePayload(token.sub);
        token = {
          ...token,
          ...workspacePayload,
        };
      }

      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
};
