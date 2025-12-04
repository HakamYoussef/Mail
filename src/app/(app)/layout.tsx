import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '@/components/sidebar';
import Topbar from '@/components/topbar';
import { authOptions } from '@/lib/auth';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  return (
    <Flex minH="100vh" bg="gray.50">
      <Sidebar user={session.user} />
      <Box flex="1" ml={{ base: 0, md: 64 }}>
        <Topbar user={session.user} />
        <Box as="main" p={{ base: 4, md: 8 }}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
