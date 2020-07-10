import React, { Component } from 'react';
import { View, Platform,Button,Image,StyleSheet,ScrollView ,Text,ToastAndroid} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator,DrawerItemList,DrawerContentScrollView } from '@react-navigation/drawer';
import {  SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders,fetchFavorites } from '../redux/ActionCreators';
import NetInfo from '@react-native-community/netinfo';

import {Icon} from 'react-native-elements';

import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import Home from './HomeComponent';
import About from './Aboutus';
import Contact from './Contactus';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const Drawer = createDrawerNavigator();

const mapStateToProps = state => {
  return {
    
  }
}

const mapDispatchToProps = dispatch => ({
   fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()), 
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchFavorites:() => dispatch(fetchFavorites())
  })

function HomeScreen({ navigation }) {
  return (
    <View screenOptions={{  
        headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff" }}>
      <Button
        onPress={() => navigation.navigate('MenuNavigatorScreen')}
        title="Go to menu"
      />
    </View>
  );
}


const Head= ({navigation}) => {
    return (<Icon name="menu" size={24} 
              color= 'white'
              onPress={ () => navigation.toggleDrawer() } /> );
}


function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
           
            screenOptions={({navigation}) => ({
                headerLeft:() => <Head navigation={navigation} />,
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            })}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Home'
            screenOptions={({navigation}) => ({
                headerLeft:() => <Head navigation={navigation} />,
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            })}
        >
            <MenuNavigator.Screen
                name="Home"
                component={Home}
            />
                      
        </HomeNavigator.Navigator>
    );
}

function AboutNavigatorScreen() {

   return(
        <HomeNavigator.Navigator
            initialRouteName='About'
            screenOptions={({navigation}) => ({
                headerLeft:() => <Head navigation={navigation} />,
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            })}
        >
            <MenuNavigator.Screen
                name="About"
                component={About}
            />
                      
        </HomeNavigator.Navigator>
    );
}

function ContactNavigatorScreen() {

   return(
        <HomeNavigator.Navigator
            initialRouteName='About'
            screenOptions={({navigation}) => ({
                headerLeft:() => <Head navigation={navigation} />,
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            })}
        >
            <MenuNavigator.Screen
                name="Contact"
                component={Contact}
            />
                      
        </HomeNavigator.Navigator>
    );
}

function ReserveNavigatorScreen() {

   return(
        <HomeNavigator.Navigator
            initialRouteName='Reserve Table'
            screenOptions={({navigation}) => ({
                headerLeft:() => <Head navigation={navigation} />,
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            })}
        >
            <MenuNavigator.Screen
                name="Reserve Table"
                component={Reservation}
            />
                      
        </HomeNavigator.Navigator>
    );
}


function FavoriteNavigatorScreen() {

   return(
        <HomeNavigator.Navigator
            initialRouteName='My Favorites'
            screenOptions={({navigation}) => ({
                headerLeft:() => <Head navigation={navigation} />,
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            })}
        >
            <MenuNavigator.Screen
                name="My Favorites"
                component={Favorites}
            />
                      
        </HomeNavigator.Navigator>
    );
}

function LoginNavigatorScreen() {

   return(
        <HomeNavigator.Navigator
            initialRouteName='Login'
            screenOptions={({navigation}) => ({
                headerLeft:() => <Head navigation={navigation} />,
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            })}
        >
            <MenuNavigator.Screen
                name="Login"
                component={Login}
            />
                      
        </HomeNavigator.Navigator>
    );
}


class Main extends Component {

    componentDidMount() {
    this.props.fetchComments();
    this.props.fetchDishes();
    this.props.fetchFavorites();
    this.props.fetchPromos();
    this.props.fetchLeaders();
   

    const unsubscribe = NetInfo.addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
   switch (state.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
});

  }



  render() {

    const CustomDrawerContentComponent =(props)=>  {
    return (
    <DrawerContentScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>);
 };
 
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home" drawerStyle={{ backgroundColor:'#d1c4e9'}} drawerContent={(props) =>  <CustomDrawerContentComponent {...props} />}>
        <Drawer.Screen name="Login" component={LoginNavigatorScreen} options={{title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor, focused }) => (
              <Icon
                name='sign-in'
                type='font-awesome'            
                size={22}
                color={tintColor}
              />
            )}} />
        <Drawer.Screen name="Home" component={HomeNavigatorScreen} options={{  drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          )}} />
        <Drawer.Screen name="Menu" component={MenuNavigatorScreen}  options={{drawerLabel: 'Menu',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          )}}
              />
        <Drawer.Screen name="About" component={AboutNavigatorScreen} options={{drawerLabel: 'About Us',
            drawerIcon: ({ tintColor, focused }) => (
              <Icon
                name='info-circle'
                type='font-awesome'            
                size={24}
                color={tintColor}
              />
            )}} />
        <Drawer.Screen name="Contact" component={ContactNavigatorScreen} options={{title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor, focused }) => (
              <Icon
                name='address-card'
                type='font-awesome'            
                size={22}
                color={tintColor}
              />
            )}} />
            <Drawer.Screen name="Reserve" component={ReserveNavigatorScreen} options={{title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor, focused }) => (
              <Icon
                name='cutlery'
                type='font-awesome'            
                size={22}
                color={tintColor}
              />
            )}} />
             <Drawer.Screen name="My Favorites" component={FavoriteNavigatorScreen} options={{title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor, focused }) => (
              <Icon
                name='heart'
                type='font-awesome'            
                size={22}
                color={tintColor}
              />
            )}} />
            
      </Drawer.Navigator>           
        </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);