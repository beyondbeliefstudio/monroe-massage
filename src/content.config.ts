import { glob, file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const reviews = defineCollection({
  loader: file("src/data/reviews.json"),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      stars: z.number(),
      description: z.string(),
      isFeatured: z.boolean(),
    }),
});

export const collections = {
  reviews,
};
