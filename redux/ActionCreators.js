import * as ActionTypes from './ActionTypes';
import {  firestore, firebasestore } from '../firebase/firebase';



export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading());

    return firestore.collection('dishes').get()
        .then(snapshot => {
            let dishes = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                dishes.push({_id, ...data });
            });
            
            return dishes;
        })
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {
    return firestore.collection('comments').get()
        .then(snapshot => {
            let comments = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                comments.push({_id, ...data });
            });
            return comments;
        })
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

   return firestore.collection('promotions').get()
        .then(snapshot => {
            let promos = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                promos.push({_id, ...data });
            });
            return promos;
        })
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());

    return firestore.collection('leaders').get()
        .then(snapshot => {
            let leaders = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                leaders.push({_id, ...data });
            });
            return leaders;
        })
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFavorite = (dishId)  => (dispatch) => {

    return firestore.collection('dishes').doc(dishId).set({
        favorite:true
    },{merge:true})
    
            .then(doc => {
                dispatch(fetchFavorites())
            
    })
    .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {

    dispatch(favoritesLoading(true));

    return firestore.collection('dishes').where('favorite','==',true).get()
    .then(snapshot => {
        let favorites = [];
        snapshot.forEach(doc => {
            const data = doc.data()
            const _id=doc.id
            favorites.push({_id, ...data});
        });
        return favorites;
    })
    .then(favorites => dispatch(addFavorites(favorites)))
    .catch(error => dispatch(favoritesFailed(error.message)));
};

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});

export const postComment = (dishId, author,rating, comment) => (dispatch) => {

    return firestore.collection('comments').add({
        author:author,
        dishId: dishId,
        rating: rating,
        comment: comment,
        createdAt: firebasestore.FieldValue.serverTimestamp(),
        updatedAt: firebasestore.FieldValue.serverTimestamp()
    })
    .then(docRef => {
        firestore.collection('comments').doc(docRef.id).get()
            .then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    const _id = doc.id;
                    let comment = {_id, ...data};
                    dispatch(addComment(comment))
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });
    })
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your comment could not be posted\nError: '+ error.message); })
};

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
    
});

export const deleteFavorite = (dishId)  => (dispatch) => {

    return firestore.collection('dishes').doc(dishId).set({
        favorite:false
    },{merge:true})
    .then(docRef => { dispatch(fetchFavorites())
    })
    .catch(error => dispatch(favoritesFailed(error.message)));
};