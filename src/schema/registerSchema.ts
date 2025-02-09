import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({ required_error: "Email is required" }),
  password: z.string({ required_error: "Password is required" }),
  image:z.string({ required_error: "Image is required" })
});
