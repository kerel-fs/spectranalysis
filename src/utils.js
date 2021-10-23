/*
 * Store the value of an <input>, <textarea> etc in local storage,
 * and restore it on page load.
 */
function persistInput(input)
{
  var key = "input-" + input.id;
  var storedValue = localStorage.getItem(key);

  if (storedValue)
      // Restore value from localStorage
      input.value = storedValue;

  input.addEventListener('input', function ()
  {
      // Store value to localStorage
      localStorage.setItem(key, input.value);
  });
}


export { persistInput };
