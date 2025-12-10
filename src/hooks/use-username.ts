import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

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
  return `anon-${word}-${nanoid(5)}`;
};

export const useUsername = () => {
  const [username, setUsername] = useState("");

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

  return { username };
};
