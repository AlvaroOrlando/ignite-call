import { Button, Text, TextInput } from '@ignite-ui/react'
import { Form, FormAnnotation } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const claimUsernaneZodSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter somente letras e hifens',
    })
    .transform((username) => username.toLocaleLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernaneZodSchema>

async function handleClaimUsernme(data: ClaimUsernameFormData) {
  console.log(data)
}

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernaneZodSchema),
  })

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsernme)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuário"
          {...register('username')}
        />
        <Button size="sm" type="submit">
          Reservar
          <ArrowRight />
        </Button>
        <FormAnnotation></FormAnnotation>
      </Form>
      <Text size="sm">
        {errors.username
          ? errors.username.message
          : 'Digite o nome do usuário desejado'}
      </Text>
    </>
  )
}
