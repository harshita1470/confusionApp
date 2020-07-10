import React,{ Component} from 'react';
import { Text, View,ScrollView,FlatList ,StyleSheet,Button,Modal,Alert,PanResponder,Share} from 'react-native';
import { Card,Icon,Rating,Input } from 'react-native-elements';


import { connect } from 'react-redux';
import { postFavorite ,postComment} from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites:state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment:(dishId,author,rating,comment) => dispatch(postComment(dishId,author,rating,comment))
})

  

function RenderDish(props) {

    const dish = props.dish;
    
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }
 
    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if ( dx > 200 )
            return true;
        else
            return false;
    }

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }
   

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {dish.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
            if (recognizeComment(gestureState))
               { props.onClick();}
            return true;
        }
    })

        

        if (dish != null) {
            console.log(props.favorite);
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                 {...panResponder.panHandlers}>
                <Card containerStyle={{marginTop: 35}}
                featuredTitle={dish.name}
                image={{uri: dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                     <Icon
                    raised
                    reverse
                    name={ props.favorite == false ? 'heart-o' : 'heart'}
                    type='font-awesome'
                    color='#f50'
                        onPress={() => props.favorite == false ?  props.onPress() : console.log('Already favorite') }
                    />
                    <Icon style={{flex: 2}}
                    raised
                    reverse
                    name='pencil'
                    type='font-awesome'
                    color='#512DA8'
                    onPress={() => props.onClick()}
                    />
                    <Icon
                     raised
                     reverse
                     name='share'
                     type='font-awesome'
                     color='#51D2A8'
                     style={styles.cardItem}
                     onPress={() => shareDish(dish.name, dish.description, dish.image)} />
                </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
    
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
               <Rating imageSize={15} readonly startingValue={item.rating} />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}> 
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item._id.toString()}
            />
        </Card>
        </Animatable.View>

    );
}

class Dishdetail extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            showModal:false,
            author:'',
            rating:1,
            comment:'',

        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    handleComment(dishId) {
          this.props.postComment(dishId,this.state.author,this.state.rating,this.state.comment);
    } 

    resetForm() {
        this.setState({
            showModal:false,
            author:'',
            rating:1,
            comment:''
        });
    }


    render() {
        const dishId=this.props.route.params.dishId;

    return(<ScrollView>
                <RenderDish dish={this.props.dishes.dishes.filter((dish) => dish._id === dishId)[0]} 
                    onPress={() => this.markFavorite(dishId)} onClick={ () => this.toggleModal()} 
                    favorite={this.props.favorites.favorites.some((dish)=> dish._id==dishId)}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <View styles={styles.formRow} >
                        <Rating 
                          showRating
                          type='custom'
                          startingValue={1}
                          ratingCount={5}
                          imageSize={50}
                          onFinishRating={(rating) => this.setState({rating:rating})}
                         style={{ paddingVertical: 10 }}
                              />
                        </View>
                        <View styles={styles.formRow}>
                        <Input 
                            placeholder=" Author"
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={(text) => this.setState({author:text})}
                           />
                        </View>
                         <View styles={styles.formRow}>
                        <Input  
                            placeholder=" Comment"
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            onChangeText={(text) => this.setState({comment:text})}
                           />
                        </View>
                        <Button  onPress={() => {this.handleComment(dishId),this.toggleModal()}} 
                    title="Submit"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button" />
                     <Button onPress={() => this.toggleModal()} 
                    title="Cancel"
                    color="#c8c7c8"
                    accessibilityLabel="Learn more about this purple button" />
                    </View>
                </Modal>
            </ScrollView>
    );
}
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      marginTop: 20
      
    },
    
     modal: {
       justifyContent: 'center',
       margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);