import { Platform } from 'react-native';
import { useTheme } from 'native-base';

import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Exercise } from '@screens/Exercise';
import { Profile } from '@screens/Profile';
import { History } from '@screens/History';
import { Home } from '@screens/Home';

import ProfileSvg from '@assets/profile.svg';
import HistorySvg from '@assets/history.svg';
import HomeSvg from '@assets/home.svg';

type AppRoutes = {
  home: undefined;
  exercise: { exerciseId: string };
  history: undefined;
  profile: undefined;
};

export type AppNavigatorRoutesProp = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { colors, sizes } = useTheme();
  const iconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 96 : 'auto',
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{
          tabBarButton: () => null, // disable icon button
        }}
      />
    </Navigator>
  );
}
