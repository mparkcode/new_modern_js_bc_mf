const createAutoComplete = ({
  root, 
  renderOption, 
  onOptionSelect, 
  inputValue, 
  fetchData
}) => {
  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;

  //Get the input element and add an input event listener to it
  //an input event is anytime a user enters something into an input
  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');

  //calls the fetchData function on value passed into the input
  const onInput = async event => {
    const items = await fetchData(event.target.value); //event.target.value is the value entered into the input
    resultsWrapper.innerHTML = '';
    if(!items.length){
      dropdown.classList.remove('is-active');
      return;
    }
    dropdown.classList.add('is-active');
    for(let item of items){
      const option = document.createElement('a');
      
      option.classList.add('dropdown-item')
      option.innerHTML = renderOption(item);
      option.addEventListener('click', ()=>{
        dropdown.classList.remove('is-active');
        input.value = inputValue(item);
        onOptionSelect(item);
      });
      resultsWrapper.appendChild(option)
    }
  };

  //use debounce function from utils.js to call onInput function on the input element every 0.5 seconds
  input.addEventListener('input', debounce(onInput, 500));

  document.addEventListener('click', event => {
    if (!root.contains(event.target)){ 
      dropdown.classList.remove('is-active')
    }
  });
}