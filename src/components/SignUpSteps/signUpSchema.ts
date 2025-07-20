import z from 'zod';


export const signUpSchema = z.object({
  goal: z.enum(['lose', 'maintain', 'gain']),
  gender: z.enum(['male', 'female'], {
    error: 'Selecione um gênero',
  }),
  birthDate: z
    .string()
    .min(10, 'Informe uma data válida')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato deve ser dd/mm/aaaa'),
  height: z
    .string()
    .min(2, 'Informe sua altura em centímetros')
    .regex(/^\d{2,3}$/, 'Altura deve ser um número válido (ex: 170)'),
  weight: z
    .string()
    .min(2, 'Informe seu peso em kg')
    .regex(/^\d{2,3}$/, 'Peso deve ser um número válido (ex: 70)'),
  activityLevel: z
    .enum(['1', '2', '3', '4', '5'], {
      error: 'Selecione seu nível de atividade',
    }),
  email: z
    .email('Digite um e-mail válido'),
  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;