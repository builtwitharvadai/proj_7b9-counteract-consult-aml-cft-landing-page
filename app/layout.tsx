import type { Metadata } from 'next';
import { Exo_2, Saira_Condensed } from 'next/font/google';
import type { ReactNode } from 'react';

import './globals.css';

const sairaCondensed = Saira_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-saira',
  display: 'swap',
});

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-exo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CounterAct Consult | AML/CFT Compliance & Fraud Prevention',
  description:
    'CounterAct Consult delivers specialist AML/CFT compliance, fraud detection, and financial-crime advisory services. Compliance is our priority. Trust is our promise.',
  icons: {
    icon: '/assets/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className={`${sairaCondensed.variable} ${exo2.variable}`}>
      <head>
        <script
          src="https://api.arvad.ai/api/v1/runtime/arvad.js"
          defer
          {...{
            onerror:
              "this.onerror=null;this.src='http://127.0.0.1:3001/api/v1/runtime/arvad.js'",
          }}
        />
      </head>
      <body className="font-body">{children}</body>
    </html>
  );
}
