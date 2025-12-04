import { PrismaClient, MembershipRole } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const email = 'founder@example.com';
  const workspaceId = randomUUID();

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      id: randomUUID(),
      email,
      name: 'Workspace Owner',
    },
  });

  const workspace = await prisma.workspace.upsert({
    where: { id: workspaceId },
    update: {},
    create: {
      id: workspaceId,
      name: 'Core Workspace',
      members: {
        create: [{ userId: user.id, role: MembershipRole.OWNER }],
      },
      folders: {
        create: [{ name: 'Inbox' }, { name: 'Archive' }],
      },
      labels: {
        create: [
          { name: 'Priority', color: '#3572e8' },
          { name: 'Docs', color: '#8b5cf6' },
        ],
      },
    },
  });

  await prisma.doc.upsert({
    where: { id: 'welcome-doc' },
    update: {},
    create: {
      id: 'welcome-doc',
      title: 'Product Requirements',
      workspaceId: workspace.id,
      authorId: user.id,
      blocks: {
        create: [
          { content: 'Document the onboarding flows.', position: 0 },
          { content: 'Outline workspace-aware routing.', position: 1 },
        ],
      },
    },
  });

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
