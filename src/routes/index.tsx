import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/wave/index.html");
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <a href="/wave/index.html" className="underline">Open Wave site →</a>
    </div>
  );
}
