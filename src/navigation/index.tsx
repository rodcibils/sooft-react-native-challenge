import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Inbox } from "./screens/Inbox";
import { NotFound } from "./screens/NotFound";
import { Send } from "./screens/Send";

const HomeTabs = createBottomTabNavigator({
  screens: {
    Inbox: {
      screen: Inbox,
      options: {
        title: "Inbox",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="inbox" size={size} color={color} />
        ),
      },
    },
    Send: {
      screen: Send,
      options: {
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="send" size={size} color={color} />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Inbox",
        headerShown: false,
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
