import { Center, Image, Heading, Text, VStack, ScrollView } from 'native-base';
import { Controller, useForm } from 'react-hook-form';

import { useNavigation } from '@react-navigation/native';

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

export function SignUp() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp(data: FormDataProps) {
    console.log(data);
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          alt="People training"
          defaultSource={BackgroundImg}
          position="absolute"
          resizeMode="contain"
          source={BackgroundImg}
        />
        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontFamily="heading" fontSize="xl" mb={6}>
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Informe o nome.',
            }}
            render={({ field: { onChange, value } }) => (
              <Input placeholder="Name" onChangeText={onChange} value={value} />
            )}
          />

          {!!errors?.name && <Text color="white">{errors.name.message}</Text>}

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          mt={24}
          title="Voltar para o login"
          variant="outline"
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
