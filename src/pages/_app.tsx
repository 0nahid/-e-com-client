import { StyleProvider } from '@/Context/StyleContext';
import store from '@/Redux/store';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import React from "react";
import { Provider } from 'react-redux';

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <StyleProvider>
          <main className={poppins.className}>
            <Component {...pageProps} />
          </main>
        </StyleProvider>
      </Provider>
    </QueryClientProvider>
  );
}
