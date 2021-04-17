
$('#searching').empty();
$('#searching').append(`  <select name="valueSearch" id="valueSearch" class="input"><option value='African'>African</option>  
              <option value="American">American</option>
                      <option value="European">European</option>    
                          <option value="Italian">Italian</option> 
                            <option value="Middle Eastern">Middle Eastern</option>   </select>`);

$('#typeSearch').on('change', function () {


    switch ($(this).val()) {
        case 'cuisine':
            $('#searching').empty();
            $('#searching').append(`  <select name="valueSearch" id="valueSearch" class="input">
        <option value='African'>African</option>  
              <option value="American">American</option>
                      <option value="European">European</option>    
                          <option value="Italian">Italian</option> 
                            <option value="Middle Eastern">Middle Eastern</option>   </select>`);

            break;
        case 'diet':
            $('#searching').empty();
            $('#searching').append(`  <select name="valueSearch" id="valueSearch" class="input">
            <option value='Ketogenic'>Ketogenic</option> 
                   <option value="Vegetarian">Vegetarian</option> 
                          <option value="Lacto-Vegetarian
                          ">Lacto Vegetarian
                          </option>  
                                <option value="Ovo-Vegetarian
                                ">Ovo Vegetarian
                                </option> <option value="Vegan
                                ">Vegan
                                </option>   </select>`);

            break;
        case 'intolerances':
            $('#searching').empty();
            $('#searching').append(`  <select name="valueSearch" id="valueSearch" class="input"><option value='Seafood'>Seafood</option> 
                  <option value="Dairy">Dairy</option>
                          <option value="Egg">Egg</option>    
                              <option value="Gluten">Gluten</option> 
                                <option value="Wheat">Wheat</option>   </select>`);


            break;
        case 'includeIngredients':
            $('#searching').empty();
            $('#searching').append(`<input type="text" name="valueSearch" id="valueSearch"
            placeholder="list of ingredients, input must be like: tomato,cheese">`);

            break;
    }
});

