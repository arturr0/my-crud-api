let PRODUCTS;

$(function() {
    // GET/READ
    $('#get-button').on('click', function() {
        $.ajax({
            url: '/products',
            contentType: 'application/json',
            success: function(response) {
                let tbodyEl = $('tbody');
                
                tbodyEl.html('');
                PRODUCTS = response.products;
                response.products.forEach(function(product) {
                    
                    
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + product.id + '</td>\
                            <td><input type="text" class="name" value="' + product.name + '"></td>\
                            <td>\
                                <button class="update-button">UPDATE</button>\
                                <button class="delete-button">DELETE</button>\
                                <button class="raise-button">+</button>\
                                <button class="down-button">-</button>\
                            </td>\
                            <td class="quant" style="color: red;"> &nbsp &nbsp &nbsp   ' + product.quantity + '</td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        let createInput = $('#create-input');
        let createVal = $('#quantity');
        let trimmedInput1 = createInput.val().trim();
        let trimmedInput2 = createVal.val().trim();
        let checkInt = parseInt(trimmedInput2, 10);
        console.log('quant' + createVal.val())
        if (trimmedInput1 != '' && trimmedInput2 != '' && !isNaN(checkInt) && Number.isInteger(checkInt)) {
        $.ajax({
            url: '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val(), quantity: createVal.val() }),
            
            success: function(response) {
                console.log(response);
                createInput.val('');
                createVal.val('');
                $('#get-button').click();
                
            }
            
        });
    }
    else alert("wrong");
        //NAME = createInput.val();
    });

    //PLUS

    $('table').on('click', '.raise-button', function() {
        
        let rowEl = $(this).closest('tr');
        let id = rowEl.find('.id').text();
        

        $.ajax({
            url: '/products/quantity/' + id,
            method: 'POST',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    //MINUS

    $('table').on('click', '.down-button', function() {
        
        let rowEl = $(this).closest('tr');
        let id = rowEl.find('.id').text();
        

        $.ajax({
            url: '/products/down/' + id,
            method: 'POST',
            contentType: 'application/json',
            
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '.update-button', function() {
        let rowEl = $(this).closest('tr');
        let id = rowEl.find('.id').text();
        let newName = rowEl.find('.name').val();
        
        $.ajax({
            url: '/products/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
    
    
    // DELETE
    
   
    $('table').on('click', '.delete-button', function() {
        let rowEl = $(this).closest('tr');
        let id = rowEl.find('.id').text();

        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
});


