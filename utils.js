//Only allows the fetchData function to be called after no input for 1 second
const debounce = (func, delay=1000) => {
  let timeoutId;
  return (...args) => { //...args rest parameter that takes in arguments passed in with func
    if(timeoutId){
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(()=>{
      func.apply(null, args); //.apply - takes the args iterable and applies as arguments to the func function
    }, delay);
  };
}