import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '../Input';
import { SignUpFormData } from './signUpSchema';

export function BirthDateStep() {
  const form = useFormContext<SignUpFormData>();

  return (
    <Controller
      control={form.control}
      name="birthDate"
      render={({ field, fieldState }) => (
        <Input
          label="Data de nascimento"
          placeholder="dd/mm/aaaa"
          mask="99/99/9999"
          value={field.value}
          onChangeText={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
