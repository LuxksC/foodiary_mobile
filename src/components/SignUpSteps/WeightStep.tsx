import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '../Input';
import type { SignUpFormData } from './signUpSchema';

export function WeightStep() {
  const form = useFormContext<SignUpFormData>();

  return (
    <Controller
      control={form.control}
      name="weight"
      render={({ field, fieldState }) => (
        <Input
          label="Peso"
          placeholder="Ex: 70"
          keyboardType="numeric"
          append="kg"
          value={field.value}
          onChangeText={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
