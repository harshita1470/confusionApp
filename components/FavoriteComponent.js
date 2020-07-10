import React, { Component } from 'react';
import { FlatList, View, Text,Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';

import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
       favorites:state.favorites
       }
  }

  const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    };

    render() {

        const { navigate } = this.props.navigation;

       
        
        const renderMenuItem = ({item, index}) => {

            

              const rightButton = [
                {
                    text: 'Delete', 
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete the favorite dish ' + item.name + '?',
                            [
                                { 
                                    text: 'Cancel', 
                                    onPress: () => console.log(item.name + 'Not Deleted'),
                                    style: ' cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFavorite(item._id)
                                }
                            ],
                            { cancelable: false }
                        );
                        
                    }
                }
            ];
            
          if(item.favorite) {
            return (
                <Swipeout right={rightButton} autoClose={true}>
                <Animatable.View animation="fadeInRightBig" duration={2000}> 
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('Dishdetail', { dishId: item._id })}
                    leftAvatar={{ source: {uri: item.image}}}
                    />
                    </Animatable.View>
                </Swipeout>    
            );
          }
          else {
            return(<View></View>);
          }
            
        };

        if (this.props.favorites.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.favorites.errMess) {
            return(
                <View>            
                    <Text>{this.props.favorites.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <FlatList 
                    data={this.props.favorites.favorites}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item._id.toString()}
                    />
            );
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Favorites);