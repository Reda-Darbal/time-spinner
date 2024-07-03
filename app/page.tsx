// app/page.tsx
import Head from "next/head";
import TimerSpinner from "./components/TimerSpinner";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Timer Spinner Example</title>
        <meta name="description" content="Timer Spinner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center h-screen bg-gray-100">
        <TimerSpinner />
      </main>
    </div>
  );
}
