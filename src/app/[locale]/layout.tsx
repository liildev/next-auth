import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ReactNode } from 'react';
import { Session } from '../../provider/session';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <head>
        <title>next-intl & next-auth</title>
      </head>
      <body>
        <Session>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Session>
      </body>
    </html>
  );
}
