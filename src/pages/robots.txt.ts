import type { APIRoute } from "astro";

const robots = `
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /`.trim();

export const GET: APIRoute = () =>
  new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
