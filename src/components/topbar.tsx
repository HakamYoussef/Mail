'use client';

import { Avatar, Box, Button, Flex, HStack, Icon, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { FiChevronDown, FiPlus } from 'react-icons/fi';

interface TopbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    workspaces?: { id: string; name: string; role: string }[];
    activeWorkspaceId?: string | null;
  };
}

export default function Topbar({ user }: TopbarProps) {
  const activeWorkspace = user?.workspaces?.find((w) => w.id === user?.activeWorkspaceId);

  return (
    <Flex
      align="center"
      justify="space-between"
      px={{ base: 4, md: 8 }}
      py={4}
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={10}
      shadow="card"
    >
      <HStack spacing={3}>
        <Icon as={FiPlus} color="blue.500" />
        <Stack spacing={0}>
          <Text fontWeight="semibold">{activeWorkspace?.name ?? 'Workspace'}</Text>
          <Text fontSize="xs" color="gray.500">
            {activeWorkspace ? activeWorkspace.role.toLowerCase() : 'No workspace linked'}
          </Text>
        </Stack>
      </HStack>

      <HStack spacing={3}>
        <Button leftIcon={<FiPlus />} colorScheme="blue" variant="solid" size="sm">
          New
        </Button>
        <Menu>
          <MenuButton as={Button} variant="ghost" rightIcon={<FiChevronDown />}>
            <HStack>
              <Avatar size="sm" name={user?.name ?? 'User'} src={user?.image ?? undefined} />
              <Box textAlign="left">
                <Text fontWeight="medium" noOfLines={1}>
                  {user?.name ?? 'User'}
                </Text>
                <Text fontSize="xs" color="gray.500" noOfLines={1}>
                  {user?.email}
                </Text>
              </Box>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => signOut({ callbackUrl: '/signin' })}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
}
