
// this is an action creator, 
// which is a function that returns an object
export const increment = (n) => {
    
    return{
        type: "INCREMENT",
        data: n
    }

}

// this is not a named export. 
// When we import into our component we have to import like this:

// import {increment} from './path'


// named export looks like:
// import increment from '.path'