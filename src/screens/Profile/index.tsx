import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email?: string;
  old_password: string;
  password: string;
  password_confirm: string;
};

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  old_password: yup.string().required('Informe a senha antiga.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 digitos.'),
  password_confirm: yup
    .string()
    .required('Confirme a senha.')
    .oneOf([yup.ref('password')], 'A confirmação da senha não confere.'),
});

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/gabrielcsg.png'
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: 'Gabriel Castro',
      email: 'email@test.com',
      old_password: '',
      password: '',
      password_confirm: '',
    },
  });

  const toast = useToast();

  async function handleUserPhotoSelect() {
    try {
      setPhotoIsLoading(true);
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        aspect: [4, 4],
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets?.[0]?.uri) {
        const { uri: photoUri } = photoSelected.assets[0];
        const photoInfo = await FileSystem.getInfoAsync(photoUri);

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: 'top',
            bgColor: 'red.500',
            title: 'Essa imagem é muito grande, escolha uma de até 5MB.',
          });
        }
        setUserPhoto(photoUri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  function handleEditProfile(data: FormDataProps) {
    console.log(data);
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="green.500"
              fontSize="md"
              fontWeight="bold"
              mb={8}
              mt={2}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.600"
                placeholder="Name"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.600"
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
                isDisabled
              />
            )}
          />

          <Heading
            alignSelf="flex-start"
            color="gray.200"
            fontSize="md"
            mb={2}
            mt={12}
            fontFamily="heading"
          >
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.old_password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password_confirm?.message}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleEditProfile)}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
