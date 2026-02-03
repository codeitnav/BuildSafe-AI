"use client"
import { useEffect, useState } from "react";
import { checkBackend } from "../lib/api";

export default function Home() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    checkBackend().then((data) => setStatus(data.status));
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">BuildSafe AI</h1>
      <p className="mt-4">Backend status: {status}</p>
    </main>
  );
}
