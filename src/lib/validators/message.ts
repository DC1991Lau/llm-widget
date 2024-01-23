import * as z from "zod";

export const messageInputSchema = z.object({
  text: z.string().min(1),
});
