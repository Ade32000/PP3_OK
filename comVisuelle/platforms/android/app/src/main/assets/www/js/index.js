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
    db.transaction(testcategoris, errorCB, successCB);
} 

function searchAllCategories(tx)
{
    tx.executeSql('SELECT * FROM categories ORDER BY category_name ASC;', [], function(tx, result){
        categories = result.rows;
        //console.log(categories);
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

function testcategoris(tx)
{
    tx.executeSql("SELECT * FROM to_belong", [], function (tx, result)
    {
        //console.log(result.rows)
    });
}

function searchByCategory(tx)
{
    var catId = parseInt(str);
    numberOfTurn = 0;
    resetInterface();
    //console.log(catId);
    tx.executeSql('SELECT fk_picture FROM to_belong WHERE fk_category =' + catId, [], function(tx, result)
    {
        console.log("je select la categorie");
        var pic_in_cat = result.rows;
        var picturesFromCategories = [];
        byCat = [];
        for(var i = 0; i < pic_in_cat.length; i++)
        {
            console.log("je recupere les id des images correspondant a la categorie");
            picturesFromCategories.push(pic_in_cat[i].fk_picture);
        }
        for (var i = 0; i < picturesFromCategories.length; i++)
        {
            console.log("je coucle dans picturesFromCategories");
            console.log(picturesFromCategories);
            tx.executeSql('SELECT * FROM pictures WHERE picture_id=' + picturesFromCategories[i] + ';', [],function(tx, picturesFromThisCat){
                console.log("je select l'image depuis son id");
                console.log(picturesFromThisCat.rows);
                byCat.push(picturesFromThisCat.rows[0]);
                console.log(byCat);
                console.log(numberOfTurn);
                if(numberOfTurn == picturesFromCategories.length-1)
                {
                    console.log("jai bouclé le dernier");
                    for(var b = 0; b < byCat.length; b++)
                    {
                        console.log("je push dans byCat les images");
                        console.log(byCat[b]);
                        byCategory.push(byCat[b]);
                        console.log(byCategory);
                    }
                    console.log(byCategory);
                    displaySearchByCategory(byCategory);
                    byCategory = [];
                    byCat = [];
                }
                numberOfTurn++;
            });
        }
    });

}

function displayPicturesByCategory()
{
    console.log(byCat);
}

function searchByKeyword(tx)
{
    var inputVal = $('#inputSearch').val() + "%";
    //console.log(inputVal);
    tx.executeSql('SELECT * FROM pictures WHERE picture_name LIKE "'+inputVal+'";',[],function(tx,result){
        keyword = result.rows;
        console.log(keyword);
        displaySearchByKeyword(keyword);
        return keyword;
    });
    
}

function displaySearchByKeyword(keyword)
{
    resetInterface();
    console.log(keyword);
    for(var k=0; k<keyword.length; k++){
       $('#display').append('<a href="'+keyword[k].picture_url+'" data-lightbox="'+keyword[k].picture_name+'" data-title="'+keyword[k].picture_name+'" class="images"><img src="'+keyword[k].picture_url+'" alt="'+keyword[k].picture_name+'" /></a>');
    }
}

function displaySearchByCategory(byCategory)
{
    resetInterface();
    console.log(byCategory);
    for(var b = 0; b < byCategory.length; b++){
        $('#display').append('<a href="'+byCategory[b].picture_url+'" data-lightbox="'+byCategory[b].picture_name+'" data-title="'+byCategory[b].picture_name+'" class="images"><img src="'+byCategory[b].picture_url+'" alt="'+byCategory[b].picture_name+'" /></a>');
    }
}

function resetInterface()
{
    $('#display').html("");
}
/**
 * Récupérer une image du gestionnaire de fichier de la tablette
 * 
 */
function cameraGetPicture() {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        targetWidth: 200,
        targetHeight: 200
    });
    
    function onSuccess(imageURL) {
        console.log(imageURL)
        $('#displayImg').append('<img class="imgForm" src="'+imageURL+'">');
    }
    
    function onFail(message) {
        alert('Failed because: ' + message);
    }
    
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
    db.transaction(searchAllCategories, errorCB, successCB);
    console.log(categories);
    for(var i=0; i<categories.length; i++){
        $('#selectCat').append('<option id="'+categories[i].category_id+'" value="'+categories[i].category_id+'">'+categories[i].category_name+'</option>');
    }
    return categories;
});

/***
 * Link submenu categories
 */

$('#selectCat').change(function(){
    str = $(this).children(":selected").attr("id");
    console.log("j'ai changé");
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
    console.log(keyword);
});




/* =========================  FORMULAIRE  =======================  FORMULAIRE ======================================= */

/***
 * Button Choose a file Form
 */

$('#inputFile').on('click', cameraGetPicture,function(){
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
        var isAppend = true;
        createFile(dirEntry, "fileToAppend.txt", isAppend);
    }, errorHandler);
});

function errorHandler(e) {
    var msg = '';
    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
        case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
        default:
            msg = 'Unknown Error';
            break;
    };
    console.log('Error: ' + msg);
}
/***
 * Button Confirm Form
 */