'use client';

import Link from 'next/link';
import {Session} from 'next-auth';
import {signOut, signIn} from 'next-auth/react';
import {useLocale, useTranslations} from 'next-intl';
import PageLayout from '../../components/PageLayout';

type Props = {
  session: Session | null;
};

export default function Index({session}: Props) {
  const t = useTranslations('Index');
  const locale = useLocale();
  console.log(session);

  function onLogoutClick() {
    signOut();
  }

  return (
    <PageLayout title={t('title')}>
      {session ? (
        <>
          <p>{t('loggedIn', {username: session.user?.name})}</p>
          <p>
            <Link href={locale + '/secret'}>{t('secret')}</Link>
          </p>
          <button onClick={onLogoutClick} type="button">
            {t('logout')}
          </button>
        </>
      ) : (
        <>
          <button onClick={() => signIn('google')}>Google</button>

          <button onClick={() => signIn('facebook')}>Facebook</button>

          <p>{t('loggedOut')}</p>
          <Link href={locale + '/login'}>{t('login')}</Link>
        </>
      )}
    </PageLayout>
  );
}
