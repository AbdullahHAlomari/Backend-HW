import { TypeOf, z } from "zod";

export const RegisterTypes = z.object({
    body: z.object({
        username: z.string({
            required_error: "Username is required!",
            invalid_type_error: "Invalid type error",
        }),
        password: z.number({
            required_error: "Password is required!",
            invalid_type_error: "Invalid type error",
        }),
        joiningyear: z.string({
            required_error: "Joining year is required!",
            invalid_type_error: "Invalid type error",
        }),
        email: z.string().email("Invalid email"),
        // role: z.enum([
        //     "Admin", "User"
        // ])

    })  
})

export type RegisterTypesSchema = TypeOf<typeof RegisterTypes>["body"]