'use client';

import { Button, Card, CardBody, Center, Heading, Stack, Text } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { FiGithub, FiMail } from 'react-icons/fi';

export default function SignInPage() {
  return (
    <Center minH="100vh" bg="gray.50" px={4}>
      <Card maxW="md" w="full" shadow="card" border="1px" borderColor="gray.100">
        <CardBody>
          <Stack spacing={6} textAlign="center">
            <Stack spacing={2}>
              <Heading size="lg">Welcome back</Heading>
              <Text color="gray.600">Sign in with your workspace provider to continue.</Text>
            </Stack>
            <Stack spacing={3}>
              <Button colorScheme="blue" onClick={() => signIn('google', { callbackUrl: '/' })} leftIcon={<FiMail />}>
                Continue with Google
              </Button>
              <Button
                variant="outline"
                onClick={() => signIn('microsoft-entra-id', { callbackUrl: '/' })}
                leftIcon={<FiGithub />}
              >
                Continue with Microsoft
              </Button>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
}
