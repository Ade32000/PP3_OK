document.addEventListener('deviceready', start, false);

var categories;
var pictures;
var keyword;
var str = "";
var displayForm = false;
var current;
var byCat = [];
var numberOfTurn = 0;
var byCategory = [];

//start se lance quand le téléphone est 'ready'
function start()
{
    db.transaction(fillDB, errorCB, successCB);
    db.transaction(searchAllPictures, errorCB, successCB);
} 

function searchAllCategories(tx)
{
    tx.executeSql('SELECT * FROM categories ORDER BY category_name ASC;', [], function(tx, result){
        categories = result.rows;
        console.log(categories)
        return categories;
    });
}

function searchAllPictures(tx)
{
    tx.executeSql('SELECT * FROM pictures;', [], function(tx, result){
        pictures = result.rows;
        return pictures;
    });
}

function searchByCategory(tx)
{
    var catId = parseInt(str);
    numberOfTurn = 0;

    tx.executeSql('SELECT fk_picture FROM to_belong WHERE fk_category = ' + catId + ';', [], function(tx, result)
    {
        var pic_in_cat = result.rows;
        var picturesFromCategories = [];
        byCat = [];
        for(var i = 0; i < pic_in_cat.length; i++)
        {
            picturesFromCategories.push(pic_in_cat[i].fk_picture);
        }
        for (var i = 0; i < picturesFromCategories.length; i++)
        {
            tx.executeSql('SELECT * FROM pictures WHERE picture_id=' + picturesFromCategories[i] + ';', [],function(tx, picturesFromThisCat){
                byCat.push(picturesFromThisCat.rows[0]);
                if(numberOfTurn == picturesFromCategories.length-1)
                {
                    for(var b = 0; b < byCat.length; b++)
                    {
                        byCategory.push(byCat[b]);
                    }
                    displaySearchByCategory(byCategory);
                    byCategory = [];
                    byCat = [];
                }
                numberOfTurn++;
            });
        }
    });

}

function searchByKeyword(tx)
{
    var inputVal = $('#inputSearch').val() + "%";
    tx.executeSql('SELECT * FROM pictures WHERE picture_name LIKE "'+inputVal+'";',[],function(tx,result){
        keyword = result.rows;
        displaySearchByKeyword(keyword);
        return keyword;
    });
    
}

function displaySearchByKeyword(keyword)
{
    resetInterface();
    for(var k=0; k<keyword.length; k++){
       $('#display').append('<a href="'+keyword[k].picture_url+'" data-lightbox="'+keyword[k].picture_name+'" data-title="'+keyword[k].picture_name+'" class="images"><img src="'+keyword[k].picture_url+'" alt="'+keyword[k].picture_name+'" /></a>');
    }
}

function displaySearchByCategory(byCategory)
{
    resetInterface();
    for(var b = 0; b < byCategory.length; b++){
        $('#display').append('<a href="'+byCategory[b].picture_url+'" data-lightbox="'+byCategory[b].picture_name+'" data-title="'+byCategory[b].picture_name+'" class="images"><img src="'+byCategory[b].picture_url+'" alt="'+byCategory[b].picture_name+'" /></a>');
    }
}

function resetInterface()
{
    $('#display').html("");
}

/* =======================================================================================================================
Event.js handles all click events within the application
==========================================================================================================================*/ 

/* =============  NAVBAR  =========================  NAVBAR ==========================  NAVBAR  ========================*/

/***
 * Button Admin Navbar
 */

$('#admin').on('click', function(){
    if(displayForm == false)
    {
        $('#selectCat').val("Catégories...");
        resetInterface();;
        $('#display').append('<iframe width="100%" height="600" sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals" seamless src="file:///android_asset/www/form.html">Le navigateur n\'est pas compatible></iframe>');
        displayForm = true;
    }
    
    else
    {
        resetInterface();;
        displayForm = false;
    }
});

/***
 * Button Categories Navbar
 */

$('#selectCat').one('click', function(){
    db.transaction(searchAllCategories, console.log("categories inexistante"), function()
    {
        for(var i=0; i < categories.length; i++){
            $('#selectCat').append('<option id="'+categories[i].category_id+'" value="'+categories[i].category_id+'">'+categories[i].category_name+'</option>');
        }
        return categories;
    });
});

/***
 * Link submenu categories
 */

$('#selectCat').change(function(){
    str = $(this).children(":selected").attr("id");
    db.transaction(searchByCategory, errorCB, successCB);
});

/***
 * Input Search Navbar
 */

$('#inputSearch').on('click', function(){
    db.transaction(searchByKeyword, errorCB, successCB);
    displayForm = false;
});

/**
 * Mots-clés
 */

$('#inputSearch').keyup(function(){
    db.transaction(searchByKeyword, errorCB, successCB);
});