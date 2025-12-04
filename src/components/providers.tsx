'use client';

import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { ReactNode, useMemo } from 'react';

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  const memoizedTheme = useMemo(() => theme, []);

  return (
    <SessionProvider>
      <ChakraProvider theme={memoizedTheme}>
        <ColorModeScript initialColorMode={memoizedTheme.config.initialColorMode} />
        {children}
      </ChakraProvider>
    </SessionProvider>
  );
}
