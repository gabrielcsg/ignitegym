import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      borderWidth={0}
      bg="gray.700"
      color="white"
      h={14}
      fontFamily="body"
      fontSize="md"
      px={4}
      mb={4}
      placeholderTextColor="gray.300"
      _focus={{
        bg: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      {...rest}
    />
  );
}
