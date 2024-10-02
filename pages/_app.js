import "@/styles/globals.css";
import "../lib/fontawesome";
import Layout from "@/components/Layout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
