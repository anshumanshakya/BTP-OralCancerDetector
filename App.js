import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from "./src/screens/HomeScreen";
import ImageScreen from "./src/screens/ImageScreen"
import CameraScreen from "./src/screens/CameraScreen"
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Image: ImageScreen,
    Camera:CameraScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App"
    }
  }
);

export default createAppContainer(navigator);
