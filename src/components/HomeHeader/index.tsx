import { TouchableOpacity } from 'react-native';
import { HStack, Heading, Icon, Text, VStack } from 'native-base';

import userPhotoDefault from '@assets/userPhotoDefault.png';
import { MaterialIcons } from '@expo/vector-icons';

import { UserPhoto } from '@components/UserPhoto';

export function HomeHeader() {
  return (
    <HStack bg="gray.600" pb={5} pt={16} px={8} alignItems="center">
      <UserPhoto
        alt="User Image"
        defaultSource={userPhotoDefault}
        size={16}
        source={{ uri: 'https://github.com/gabrielcsg.png' }}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          Gabriel
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
