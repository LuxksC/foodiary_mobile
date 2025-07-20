import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react-native';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { AuthLayout } from '../../components/AuthLayout';
import { Button } from '../../components/Button';
import { GenderStep } from '../../components/SignUpSteps/GenderStep';
import { GoalStep } from '../../components/SignUpSteps/GoalStep';
import { BirthDateStep } from '../../components/SignUpSteps/BirthDateStep';
import { HeightStep } from '../../components/SignUpSteps/HeightStep';
import { WeightStep } from '../../components/SignUpSteps/WeightStep';
import { signUpSchema } from '../../components/SignUpSteps/signUpSchema';
import { AccountStep } from '../../components/SignUpSteps/AccountStep';
import { ActivityLevelStep } from '../../components/SignUpSteps/ActivityLevelStep';
import { colors } from '../../styles/colors';

export default function SignUp() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const form = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const steps = [
    {
      icon: '🎯',
      title: 'Qual é seu objetivo?',
      subtitle: 'O que você pretende alcançar com a dieta?',
      Component: GoalStep,
    },
    {
      icon: '👥',
      title: 'Qual é seu gênero',
      subtitle: 'Seu gênero influencia no tipo da dieta',
      Component: GenderStep,
    },
    {
      icon: '🎂',
      title: 'Qual sua data de nascimento?',
      subtitle: 'Precisamos saber sua idade para calcular sua dieta',
      Component: BirthDateStep,
    },
    {
      icon: '📏',
      title: 'Qual sua altura?',
      subtitle: 'Informe sua altura em centímetros',
      Component: HeightStep,
    },
    {
      icon: '⚖️',
      title: 'Qual seu peso?',
      subtitle: 'Informe seu peso em kg',
      Component: WeightStep,
    },
    {
      icon: '🔥',
      title: 'Qual seu nível de atividade?',
      subtitle: 'Escolha o nível que mais se aproxima da sua rotina',
      Component: ActivityLevelStep,
    },
    {
      icon: '🔒',
      title: 'Crie sua conta',
      subtitle: 'Informe seu e-mail e defina uma senha',
      Component: AccountStep,
    },
  ];

  function handlePreviousStep() {
    if (currentStepIndex === 0) {
      router.back();
      return;
    }

    setCurrentStepIndex(prevState => prevState - 1);
  }

  function handleNextStep() {
    setCurrentStepIndex(prevState => prevState + 1);
  }

  const currentStep = steps[currentStepIndex];

  return (
    <AuthLayout
      icon={currentStep.icon}
      title={currentStep.title}
      subtitle={currentStep.subtitle}
    >
      <View className="justify-between flex-1">
        <FormProvider {...form}>
          <currentStep.Component />
        </FormProvider>

        <View className="flex-row justify-between">
          <Button size="icon" color="gray" onPress={handlePreviousStep}>
            <ArrowLeftIcon size={20} color={colors.black[700]} />
          </Button>
          {currentStepIndex < steps.length - 1 ? (
            <Button size="icon" onPress={handleNextStep}>
              <ArrowRightIcon size={20} color={colors.black[700]} />
            </Button>
          ) : (
            <Button className="flex-1" onPress={() => {/* lógica de submit aqui */}}>
              Criar conta
            </Button>
          )}
        </View>
      </View>
    </AuthLayout>
  );
}