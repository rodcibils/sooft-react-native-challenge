import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InboxIcon from "../components/InboxIcon";
import { Notification } from "../model/notification";
import Detail from "./screens/Detail";
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
          <InboxIcon color={color} size={size} />
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

const RootStack = createNativeStackNavigator<RootStackParamList>({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Inbox",
        headerShown: false,
      },
    },
    Detail: {
      screen: Detail,
      options: {
        title: "Detail",
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

export type RootStackParamList = {
  HomeTabs: undefined;
  Detail: { notification: Notification };
  NotFound: undefined;
};

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
