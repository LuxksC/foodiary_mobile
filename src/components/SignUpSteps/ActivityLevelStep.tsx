import { Controller, useFormContext } from 'react-hook-form';
import { OptionsSelector } from '../OptionsSelector';
import type { SignUpFormData } from './signUpSchema';

const options = [
  {
    icon: '🛋️',
    title: 'Sedentário',
    description: 'Pouca ou nenhuma atividade física',
    value: '1',
  },
  {
    icon: '🚶',
    title: 'Leve',
    description: 'Exercício leve 1-3 dias/semana',
    value: '2',
  },
  {
    icon: '🏃',
    title: 'Moderado',
    description: 'Exercício moderado 3-5 dias/semana',
    value: '3',
  },
  {
    icon: '🏋️',
    title: 'Pesado',
    description: 'Exercício intenso 6-7 dias/semana',
    value: '4',
  },
  {
    icon: '🤸',
    title: 'Atleta',
    description: 'Treinos muito intensos ou 2x/dia',
    value: '5',
  },
];

export function ActivityLevelStep() {
  const form = useFormContext<SignUpFormData>();

  return (
    <Controller
      control={form.control}
      name="activityLevel"
      render={({ field }) => (
        <OptionsSelector
          value={field.value}
          onChange={field.onChange}
          options={options.map(opt => ({
            ...opt,
            subtitle: opt.description,
          }))}
        />
      )}
    />
  );
}
