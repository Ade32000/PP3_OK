document.addEventListener('deviceready', start, false);

var categories;
var pictures;
var keyword;
var str = "";

//start se lance quand le téléphone est 'ready'
function start()
{
    db.transaction(fillDB, errorCB, successCB);
    db.transaction(searchAllCategories, errorCB, successCB);
    db.transaction(searchAllPictures, errorCB, successCB);
    db.transaction(searchByCategory, errorCB, successCB);
    db.transaction(searchByKeyword, errorCB, successCB);
    db.transaction(liaison, errorCB, successCB);

    //console.log(navigator.camera);
} 

function liaison(tx){
    tx.executeSql('SELECT * FROM to_belong;', [], function(tx, result){
        console.log(result.rows);
    });
}

function searchAllCategories(tx)
{
    tx.executeSql('SELECT * FROM categories ORDER BY category_name ASC;', [], function(tx, result){
        categories = result.rows;
        console.log(categories);
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
    var byCat = [];
    var byCategory = [];
    
    var catId = parseInt(str);
    console.log(str);
    tx.executeSql('SELECT fk_picture FROM to_belong WHERE fk_category='+catId+';', [], function(tx, result)
    {
        var pic_in_cat = result.rows;
        console.log(pic_in_cat);
        for (var i=0; i<pic_in_cat.length; i++)
        {
            tx.executeSql('SELECT * FROM pictures WHERE picture_id='+pic_in_cat[i].fk_picture+';',[],function(tx,result){
                //byCat = result.rows;
                byCat.push(result.rows);
                //return byCat;
                //byCategory.push(result.rows);
            });
        }
    });
        console.log(byCat);
        var tmp =[];
        for(var b=0;b<byCat.length; b++)
        {
            console.log('fuck');
            tmp.push(byCat[b]);
            for(var f=0;f<tmp.length; f++)
            {
                console.log(tmp);
                byCategory.push(tmp[f]);
            }
        }
        
        console.log(byCategory);
        return byCategory;
    
}

function searchByKeyword(tx)
{
    var inputVal = $('#inputSearch').val()+"%";
    tx.executeSql('SELECT * FROM pictures WHERE picture_name LIKE "'+inputVal+'";',[],function(tx,result){
        keyword = result.rows;
        return keyword;
    });
}


$("#selectCat").change(function () {
    $("select option:selected").each(function () {
        str="";
        str += $(this).attr('id');
        console.log(str);
        return str;
    });
});

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
    $('#selectCat').val("Catégories...");
    $('#display').html("");
    $('#display').append('<iframe width="100%" height="600" sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals" seamless src="file:///android_asset/www/form.html">Le navigateur n\'est pas compatible></iframe>');
});

/***
 * Button Categories Navbar
 */

$('#selectCat').one('click', function(){
    console.log(categories);
    db.transaction(searchAllCategories, errorCB, successCB);
    for(var i=0; i<categories.length; i++){
        $('#selectCat').append('<option id="'+categories[i].category_id+'" value="'+categories[i].category_id+'">'+categories[i].category_name+'</option>');
    }
    return categories;
});

/***
 * Link submenu categories
 */

var current;
$('#selectCat').change(function(){
    // current = $(this).children().attr('id');
    // console.log(current);
    console.log('ya qqn');
    db.transaction(searchByCategory, errorCB, successCB);
    console.log(byCategory);
    for(var b=0; b<byCategory.length; b++){
            $('#display').html("");
            // $('#display').append('<img class="zoom" accept=".jpg, .jpeg, .png, .svg, .JPG, .JPEG, .PNG, .SVG"  src="'+byCategory[b].picture_url+'"alt="'+byCategory[b].picture_name+'"/>');
            $('#display').append('<a href="'+byCategory[b].picture_url+'" data-lightbox="'+byCategory[b].picture_name+'" data-title="'+byCategory[b].picture_name+'" class="images"><img src="'+byCategory[b].picture_url+'" alt="'+byCategory[b].picture_name+'" /></a>');
        }

});

/***
 * Input Search Navbar
 */

$('#inputSearch').one('click', function(){
    db.transaction(searchAllPictures, errorCB, successCB);
    console.log(pictures);
    for(var y=0; y<pictures.length; y++){
        $('#display').html("");
        // $('#display').append('<img class="zoom" accept=".jpg, .jpeg, .png, .svg, .JPG, .JPEG, .PNG, .SVG"  src="'+pictures[y].picture_url+'"alt="'+pictures[y].picture_name+'"/>');
        $('#display').append('<a href="'+pictures[y].picture_url+'" data-lightbox="'+pictures[y].picture_name+'" data-title="'+pictures[y].picture_name+'" class="images"><img src="'+pictures[y].picture_url+'" alt="'+pictures[y].picture_name+'" /></a>');
        
    }
});

/**
 * Mots-clés
 */
$('#inputSearch').keydown(function(){
    //window.openDatabase("database", "1.0", "Cordova Demo", 200000);
    db.transaction(searchByKeyword, errorCB, successCB);
    console.log(keyword);
    $('#display').html("");
    for(var k=0; k<keyword.length; k++){
        // $('#display').append('<img accept=".jpg, .jpeg, .png, .svg, .JPG, .JPEG, .PNG, .SVG"  src="'+keyword[k].picture_url+'"alt="'+keyword[k].picture_name+'"/>');
        $('#display').append('<a href="'+keyword[k].picture_url+'" data-lightbox="'+keyword[k].picture_name+'" data-title="'+keyword[k].picture_name+'" class="images"><img src="'+keyword[k].picture_url+'" alt="'+keyword[k].picture_name+'" /></a>');
        
    }
});




/* =========================  FORMULAIRE  =======================  FORMULAIRE ======================================= */

/***
 * Button Choose a file Form
 */

$('#inputFile').on('click', cameraGetPicture,function(){
    console.log('branché');
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
        console.log('file system open: ' + dirEntry.name);
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

$('#confirmButton').on('click', function(){

});




