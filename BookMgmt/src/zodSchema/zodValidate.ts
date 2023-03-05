import { TypeOf, z } from "zod";

export const RegisterTypes = z.object({
    body: z.object({
        id: z.string({
            required_error: "ID is required",
            invalid_type_error: "Invalid type error"
        }),
        password: z.string({
            required_error: "ID is required",
            invalid_type_error: "Invalid type error"
        }),
        username: z.string({
            required_error: "ID is required",
            invalid_type_error: "Invalid type error"
        }),

    })
})

export type RegisterTypesSchema = TypeOf<typeof RegisterTypes>["body"]