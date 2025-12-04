'use client';

import { Avatar, Box, Flex, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { FiFolder, FiInbox, FiMessageCircle, FiUsers } from 'react-icons/fi';

interface SidebarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    workspaces?: { id: string; name: string; role: string }[];
  };
}

const nav = [
  { label: 'Inbox', icon: FiInbox },
  { label: 'Docs', icon: FiFolder },
  { label: 'Comments', icon: FiMessageCircle },
  { label: 'Members', icon: FiUsers },
];

export default function Sidebar({ user }: SidebarProps) {
  const workspaces = user?.workspaces ?? [];

  return (
    <Box
      w={{ base: 'full', md: 64 }}
      position="fixed"
      h="full"
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
      shadow="card"
      px={6}
      py={6}
      display={{ base: 'none', md: 'block' }}
    >
      <Stack spacing={6} h="full">
        <Stack spacing={3}>
          <Text fontSize="lg" fontWeight="semibold">
            Workspaces
          </Text>
          {workspaces.length === 0 && (
            <Text color="gray.500" fontSize="sm">
              You will see shared workspaces after accepting an invite.
            </Text>
          )}
          {workspaces.map((workspace) => (
            <Flex
              key={workspace.id}
              justify="space-between"
              align="center"
              py={2}
              px={3}
              rounded="lg"
              bg="gray.50"
              border="1px"
              borderColor="gray.100"
            >
              <Stack spacing={0}>
                <Text fontWeight="medium">{workspace.name}</Text>
                <Text fontSize="xs" color="gray.500">
                  {workspace.role.toLowerCase()}
                </Text>
              </Stack>
            </Flex>
          ))}
        </Stack>

        <Stack spacing={1}>
          {nav.map((item) => (
            <HStack
              key={item.label}
              spacing={3}
              py={2}
              px={3}
              rounded="lg"
              _hover={{ bg: 'gray.50' }}
              cursor="pointer"
            >
              <Icon as={item.icon} color="gray.600" />
              <Text fontWeight="medium">{item.label}</Text>
            </HStack>
          ))}
        </Stack>

        <Flex align="center" gap={3} mt="auto" p={3} bg="gray.50" rounded="lg">
          <Avatar size="sm" name={user?.name ?? 'User'} src={user?.image ?? undefined} />
          <Stack spacing={0}>
            <Text fontWeight="medium">{user?.name ?? 'Signed in user'}</Text>
            <Text fontSize="xs" color="gray.500">
              {user?.email ?? ''}
            </Text>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
}
