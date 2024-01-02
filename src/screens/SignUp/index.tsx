import { Center, Image, Heading, Text, VStack, ScrollView } from 'native-base';

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '../../components/Button';

export function SignUp() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="gray.700" px={10} pb={16}>
        <Image
          alt="People training"
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

          <Input placeholder="Name" />
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="E-mail"
          />
          <Input placeholder="Senha" secureTextEntry />

          <Button title="Criar e acessar" />
        </Center>

        <Button mt={24} title="Voltar para o login" variant="outline" />
      </VStack>
    </ScrollView>
  );
}
