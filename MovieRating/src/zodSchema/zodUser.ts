import { TypeOf, z } from "zod";

export const RegisterTypes = z.object({
    body: z.object({
        name: z.string({
            required_error: "Movie name is required!",
            invalid_type_error: "Invalid type error.",
        })
        .max(255, "name must be less than 50 character").min(2, "name must be greater than 2 character"),
        genre: z.enum(["Action", "Drama", "Comedy"], {
            required_error: "Genre is required!",
            invalid_type_error: "Please select a valid genre!",
        }),
        rating: z.number({
            required_error: "Cant, be null",
            invalid_type_error: "Invalid type error. It must be rating number from 1 to 10"
        })
        .min(1, "Rating can't be less than 1").max(10, "Rating can't be more than 10"),

        duration: z.number({
            required_error: "It can't be null",
            invalid_type_error: "Invalid type error. It must be number"
        })
        .min(60, "Duration must be more than 60 minutes.")
    }),
    
})

export type RegisterTypesSchema = TypeOf<typeof RegisterTypes>["body"]