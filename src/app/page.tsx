"use client";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { useRouter } from "next/navigation";

const WORDS = [
  "atlas",
  "onyx",
  "ember",
  "raven",
  "solis",
  "nova",
  "zenith",
  "cipher",
  "pulse",
  "ghost",
  "bytes",
  "cipher",
  "kernel",
  "matrix",
  "proxy",
  "vector",
  "signal",
  "static",
  "flux",
  "quantum",
  "mist",
  "void",
  "ash",
  "zen",
  "flux",
  "ion",
  "ace",
  "ray",
  "frost",
  "drift",
];

const STORAGE_KEY = "chat_username";

const generateUsername = () => {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  return `anon-${word}-${nanoid(6)}`;
};

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  useEffect(() => {
    const main = () => {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setUsername(stored);
        return;
      }

      const generated = generateUsername();
      localStorage.setItem(STORAGE_KEY, generated);
      setUsername(generated);
    };

    main();
  }, []);

  const { mutate: createRoom } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post();

      if (res.status === 200) {
        router.push(`/room/${res.data?.roomId}`);
      }
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-green-500">
            {">"}private_chat
          </h1>
          <p className="text-zinc-500 text-sm">
            A private, self-desctructing chat room
          </p>
        </div>
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center text-zinc-500">
                Your identity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-400 font-mono">
                  {username}
                </div>
              </div>
            </div>

            <button
              onClick={() => createRoom()}
              className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50"
            >
              CREATE SECURE ROOM
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
