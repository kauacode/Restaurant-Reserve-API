import { z } from "zod"

const capacitySchema = z.preprocess(
  (val) => {
    if (val === null || val === undefined) {
      return val;
    }
    const processed = Number(val);
    return isNaN(processed) ? val : processed;
  },
  z.number({
    invalid_type_error: "A capacidade deve ser um número!",
    required_error: "A capacidade é obrigatória!"
  })
    .int("Preencha um ID inteiro positivo")
    .positive("A capacidade deve ser maior que zero!")
    .min(1, "A quantidade mínima é 1 pessoa!")
    .max(10, "A quantidade máxima é de 10 pessoas!")
);

const idSchema = z.preprocess(
  (val) => {
    if (val === null || val === undefined) {
      return val;
    }

    const processed = Number(val)
    return isNaN(processed) ? val : processed;
  },
  z.number({
    invalid_type_error: "O ID deve ser um número!",
    required_error: "O ID é obrigatório!"
  })
    .int("Preencha um ID inteiro positivo")
    .positive("Preencha um ID inteiro positivo!"),
)

export const deskSchemas = {
  create: z.object({
    name: z.string()
      .min(1, "O nome é obrigatório, e deve possuir pelo menos 1 caracter!")
      .max(50, "O nome deve ter no máximo 50 caracteres!"),
    capacity: capacitySchema
  }),
  updateParams: z.object({
    id: z.number().refine(
      (val) => {
        const num = Number(val)
        return !isNaN(num) && num > 0 && Number.isInteger(num)
      },
      "O id deve ser um número inteiro positivo!"
    )
  }).transform(data => data.id),
  updateBody: z.object({
    name: z.string()
      .min(1)
      .max(50, "O nome deve possuir 1 a 50 caracteres!")
      .optional(),
    capacity: capacitySchema.optional(),
  }).refine(data => data.name || data.capacity, {
    message: "É necessário informar pelo menos um dos dois campos!"
  }),
}

export const reservationSchemas = {
  /*create: z.object({
    deskId: idSchema,
    reservationDate: z.string().refine((date) => {
      const parsedDate = new Date(date);
      const hour = parsedDate.getUTCHours(); // Pegando a hora UTC
      return hour >= 8 && hour <= 23;
    }, {
      message: "A data deve ser válida e dentro do horário de funcionamento (8h às 23h)."
    })
  }),*/

  create: z.object({
    deskId: idSchema,
    reservationDate: z.string().refine((date) => {
      const parsedDate = new Date(date);
      return parsedDate
    },)
  }),

  cancel: z.object({
    id: idSchema
  }).transform(data => data.id)

}

export const userSchemas = {
  create: z.object({
    name: z.string()
      .min(1, "O nome deve possuir pelo menos um caracter")
      .max(50, "O nome deve possuir entre 1 a 50 caracteres!"),
    email: z.string()
      .email("O e-mail deve estar no formato correto!"),
    password: z.string()
      .min(8, "A senha deve possuir no mínimo 8 caracteres!")
      .max(50, "A senha pode ter um máximo de 50 caracteres!"),
    role: z.string()
      .min(3, "A role deve ter no mínimo 3 caracteres!")
      .max(5, "A role deve ter no maximo 5 caracteres!")
      .optional()
  }),
  login: z.object({
    email: z.string()
      .email("O e-mail deve estar no formato correto"),
    password: z.string()
      .min(8, "A senha deve possuir no mínimo 8 caracteres!")
      .max(50, "A senha pode ter um máximo de 50 caracteres!"),
  })
}