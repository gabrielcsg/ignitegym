import { Center, Image, Heading, Text, VStack } from 'native-base';

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';

export function SignIn() {
  return (
    <VStack flex={1} bg="gray.700" px={10}>
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
          Acesse sua conta
        </Heading>

        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="E-mail"
        />
        <Input placeholder="Senha" secureTextEntry />
      </Center>
    </VStack>
  );
}
