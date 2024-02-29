'use client'

import { useTranslations } from 'next-intl';
import { signOut, useSession } from 'next-auth/react';
import PageLayout from '../../../components/PageLayout';

export default function Secret() {
  const t = useTranslations('Secret');
  const {data: session} = useSession();
  // const session = await getServerSession(auth);

  console.log(session);

  return (
    <PageLayout title={t('title')}>
      <p>{t('description')}</p>

      <button onClick={() => signOut({ callbackUrl: '/' })}>sign out</button>
    </PageLayout>
  );
}
