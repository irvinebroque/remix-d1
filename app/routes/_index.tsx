import { Ai } from "@cloudflare/workers-types";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

interface Env {
  AI: Ai;
}

export const loader: LoaderFunction = async ({ context, params }) => {
  let env = context.cloudflare.env as Env;
  console.log(context);
  if (!env) { throw new Error("Env is missing!") }
  const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
    prompt: "What is the origin of the phrase Hello, World"
  });
  return json(response);
};

export default function Index() {
  const results = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <div>
        A value from D1:
        <pre>{JSON.stringify(results)}</pre>
      </div>
    </div>
  );
}