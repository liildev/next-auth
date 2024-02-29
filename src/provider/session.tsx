'use client'

import { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

export const Session = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}
