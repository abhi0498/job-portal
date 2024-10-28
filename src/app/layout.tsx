import Navbar from "@/components/layout/Navbar";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { Provider } from "@/components/ui/provider";
import { Container } from "@chakra-ui/react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import Footer from "@/components/layout/Footer";
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
              <Navbar />
              <Container px={16} pt={5}>
                {children}
              </Container>
              <Footer />
            </Provider>
          </ColorModeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
