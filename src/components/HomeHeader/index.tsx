import { TouchableOpacity } from 'react-native';
import { HStack, Heading, Icon, Text, VStack } from 'native-base';

import userPhotoDefault from '@assets/userPhotoDefault.png';
import { MaterialIcons } from '@expo/vector-icons';

import { UserPhoto } from '@components/UserPhoto';
import { useAuth } from '@hooks/useAuth';

import defaultUserPhotoImg from '@assets/userPhotoDefault.png';

export function HomeHeader() {
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <HStack bg="gray.600" pb={5} pt={16} px={8} alignItems="center">
      <UserPhoto
        alt="User Image"
        defaultSource={userPhotoDefault}
        size={16}
        source={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={handleSignOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
