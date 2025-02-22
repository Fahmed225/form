import { yupValidator } from '../validator'
import yup from 'yup'
import { FieldApi, FormApi } from '@tanstack/form-core'
import { assertType } from 'vitest'

it('should allow a Zod validator to be passed in', () => {
  const form = new FormApi({
    defaultValues: {
      name: 'test',
    },
  } as const)

  const field = new FieldApi({
    form,
    name: 'name',
    validatorAdapter: yupValidator,
  } as const)
})

it('should allow a Zod validator to handle the correct Zod type', () => {
  const form = new FormApi({
    defaultValues: {
      name: 'test',
    },
  })

  const field = new FieldApi({
    form,
    name: 'name',
    validatorAdapter: yupValidator,
    validators: {
      onChange: yup.string(),
    },
  } as const)
})

it('should allow a functional onChange to be passed when using a validator', () => {
  const form = new FormApi({
    defaultValues: {
      name: 'test',
    },
  } as const)

  const field = new FieldApi({
    form,
    name: 'name',
    validatorAdapter: yupValidator,
    validators: {
      onChange: ({ value }) => {
        assertType<'test'>(value)
        return undefined
      },
    },
  })
})

it('should not allow a validator onChange to be passed when not using a validator', () => {
  const form = new FormApi({
    defaultValues: {
      name: 'test',
    },
  } as const)

  const field = new FieldApi({
    form,
    name: 'name',
    // @ts-expect-error Requires a validator
    onChange: z.string(),
  })
})

// This is not possible without higher-kinded types AFAIK
it.skip('should allow not a Zod validator with the wrong Zod type', () => {
  const form = new FormApi({
    defaultValues: {
      name: 'test',
    },
  } as const)

  const field = new FieldApi({
    form,
    name: 'name',
    validatorAdapter: yupValidator,
    validators: {
      onChange: yup.object({}),
    },
  })
})
