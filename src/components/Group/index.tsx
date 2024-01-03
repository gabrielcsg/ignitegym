import { Pressable, IPressableProps, Text } from 'native-base';

type Props = IPressableProps & {
  isActive: boolean;
  name: string;
};

export function Group({ isActive, name, ...rest }: Props) {
  return (
    <Pressable
      alignItems="center"
      bg="gray.600"
      h={10}
      justifyContent="center"
      mr={3}
      overflow="hidden"
      rounded="md"
      w={24}
      isPressed={isActive}
      _pressed={{
        borderColor: 'green.500',
        borderWidth: 1,
      }}
      {...rest}
    >
      <Text
        color={isActive ? 'green.500' : 'gray.200'}
        fontSize="xs"
        fontWeight="bold"
        textTransform="uppercase"
      >
        {name}
      </Text>
    </Pressable>
  );
}
