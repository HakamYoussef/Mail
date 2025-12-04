import { Card, CardBody, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const stats = [
  { label: 'Threads', value: '128', description: 'Active conversations across workspaces' },
  { label: 'Docs', value: '32', description: 'Drafts and published notes' },
  { label: 'Mentions', value: '14', description: 'Open notifications awaiting review' },
];

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <Stack spacing={8}>
      <Stack spacing={2}>
        <Heading size="lg">Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}.</Heading>
        <Text color="gray.600">Stay on top of workspace conversations, docs, and follow-ups.</Text>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        {stats.map((item) => (
          <Card key={item.label} bg="white" shadow="card" border="1px" borderColor="gray.100">
            <CardBody>
              <Stack spacing={1}>
                <Text fontSize="sm" color="gray.600">{item.label}</Text>
                <Heading size="lg">{item.value}</Heading>
                <Text color="gray.500" fontSize="sm">{item.description}</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      <Flex gap={4} direction={{ base: 'column', lg: 'row' }}>
        <Card flex="2" bg="white" shadow="card" border="1px" borderColor="gray.100">
          <CardBody>
            <Heading size="md" mb={2}>Recent Threads</Heading>
            <Text color="gray.500">Workspace-aware mailboxes will appear here.</Text>
          </CardBody>
        </Card>
        <Card flex="1" bg="white" shadow="card" border="1px" borderColor="gray.100">
          <CardBody>
            <Heading size="md" mb={2}>Upcoming Docs</Heading>
            <Text color="gray.500">Pinned drafts and collaborative notes will be listed.</Text>
          </CardBody>
        </Card>
      </Flex>
    </Stack>
  );
}
