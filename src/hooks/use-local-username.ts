import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";

export const UseLocalUsername = () => {
  const [username, setUsername] = useLocalStorage<string | null>(
    "username",
    localStorage.getItem("username"),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      const input = prompt("Please enter your username:")?.trim();
      if (input && input.trim() !== "") {
        setUsername(input);
      } else {
        toast.error("Username was not provided.");
      }
    } else {
      toast.message(`Welcome back, ${username}!`);
    }
    setLoading(false);
  }, [username, setUsername]);

  return { username, loading };
};
