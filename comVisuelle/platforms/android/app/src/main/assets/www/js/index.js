document.addEventListener('deviceready', start, false);

var categories;
var pictures;
var keyword;
var str = "";
var byCategory = [];

//start se lance quand le téléphone est 'ready'
function start()
{
    db.transaction(fillDB, errorCB, successCB);
    db.transaction(searchAllCategories, errorCB, successCB);
    db.transaction(searchAllPictures, errorCB, successCB);
    db.transaction(searchByCategory, errorCB, successCB);
    db.transaction(searchByKeyword, errorCB, successCB);
    console.log(navigator.camera);
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
    var byCat;
    
    var catId = parseInt(str);
    
    tx.executeSql('SELECT picture_id FROM to_belong WHERE category_id='+catId+';', [], function(tx, result){
        var pic_in_cat = result.rows;
        console.log(pic_in_cat);
        for (var i=0; i<pic_in_cat.length; i++)
        {
            tx.executeSql('SELECT * FROM pictures WHERE picture_id='+pic_in_cat[i].picture_id+';',[],function(tx,result){
                byCat = result.rows;
                return byCat;
                //byCategory.push(result.rows);
            });
        }
        console.log(byCat);
        for(var b=0;b<byCat.length; b++)
        {
            byCategory.push(byCat[b]);
        }
        console.log(byCategory);
        return byCategory;
    });
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
            $('#display').append('<img class="zoom" accept=".jpg, .jpeg, .png, .svg, .JPG, .JPEG, .PNG, .SVG"  src="'+byCategory[b].picture_url+'"alt="'+byCategory[b].picture_name+'"/>');
    }

});

/***
 * Input Search Navbar
 */

$('#inputSearch').one('click', function(){
    db.transaction(searchAllPictures, errorCB, successCB);
    console.log(pictures);
    for(var y=0; y<pictures.length; y++){
        $('#display').append('<img class="zoom" accept=".jpg, .jpeg, .png, .svg, .JPG, .JPEG, .PNG, .SVG"  src="'+pictures[y].picture_url+'"alt="'+pictures[y].picture_name+'"/>');
    }
});

$('#inputSearch').keydown(function(){
    //window.openDatabase("database", "1.0", "Cordova Demo", 200000);
    db.transaction(searchByKeyword, errorCB, successCB);
    console.log(keyword);
    $('#display').html("");
    for(var k=0; k<keyword.length; k++){
        $('#display').append('<img accept=".jpg, .jpeg, .png, .svg, .JPG, .JPEG, .PNG, .SVG"  src="'+keyword[k].picture_url+'"alt="'+keyword[k].picture_name+'"/>');
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
    }, onErrorLoadFs);
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




