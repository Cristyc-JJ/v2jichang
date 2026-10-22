import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(), description: z.string(), pubDate: z.coerce.date(), updatedDate: z.coerce.date().optional(),
    category: z.string(), tags: z.array(z.string()).default([]), featured: z.boolean().default(false), draft: z.boolean().default(false)
  })
});
const airports = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/airports' }),
  schema: z.object({
    name: z.string(), tagline: z.string(), price: z.number().nullable(), traffic: z.string(), protocols: z.array(z.string()),
    nodes: z.union([z.number(), z.string()]), streaming: z.array(z.string()), score: z.number().optional(), verdict: z.string(),
    oneTime: z.string(), coupon: z.string().optional(), rank: z.number(), status: z.string().default('待核实'),
    featured: z.boolean().default(false), affiliateUrl: z.string().url(), checkedAt: z.coerce.date()
  })
});
export const collections = { posts, airports };
