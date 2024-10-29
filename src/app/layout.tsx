import Navbar from "@/components/layout/Navbar";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { Provider } from "@/components/ui/provider";
import { Container } from "@chakra-ui/react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
// import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import Footer from "@/components/layout/Footer";
import RootProvider from "@/providers/RootProvider";
export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning lang={locale}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ColorModeProvider defaultTheme="system" enableSystem>
            <Provider>
              <RootProvider>
                <Toaster />
                <Navbar />
                <Container px={16} pt={5} minH="85vh">
                  {children}
                </Container>
                <Footer />
              </RootProvider>
            </Provider>
          </ColorModeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
