import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Entypo } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {
  name: string;
};

export function ExerciseCard({ name, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          alt="Imagem do exercicio"
          source={{
            uri: 'https://www.origym.com.br/midia/remada-unilateral-3.jpg',
          }}
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading
            fontSize="lg"
            color="white"
            numberOfLines={1}
            fontFamily="heading"
          >
            {name}
          </Heading>
          <Text fontSize="sm" color="gray.200" ml={1} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
