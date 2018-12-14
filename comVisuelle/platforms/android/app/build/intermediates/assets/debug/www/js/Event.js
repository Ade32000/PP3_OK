/* =======================================================================================================================
                        Event.js handles all click events within the application
==========================================================================================================================*/ 



/* =============  NAVBAR  =========================  NAVBAR ==========================  NAVBAR  ========================*/

/***
 * Button Admin Navbar
 */

$('#admin').on('click', function(){
    $('#display').html("");
    $('#display').append('<iframe width="100%" height="600" sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals" seamless src="file:///android_asset/www/form_html.html">Le navigateur n\'est pas compatible></iframe>');
});

/***
 * Button Categories Navbar
 */

$('#selectCat').on('click',searchAllCategories, function(){
        for(var i=0; i<categories.length; i++){
            $('#selectCat').append('<option id="'+categories[i].category_id+'" value="'+categories[i].category_id+'">'+categories[i].category_name+'</option>');
        }
        return categories;
});

/***
 * Link submenu categories
 */

var current;
$('select').change(function(){
    // current = $(this).children().attr('id');
    // console.log(current);
    console.log('ya qqn');
    db.transaction(searchByCategory, errorCB, successCB);

});

/***
 * Input Search Navbar
 */

$('#inputSearch').one('click', searchAllPictures, function(){
    for(var y=0; y<pictures.length; y++){
        $('#display').append('<img accept=".jpg, .jpeg, .png, .svg, .JPG, .JPEG, .PNG, .SVG"  src="'+pictures[y].picture_url+'"alt="'+pictures[y].picture_name+'"/>');
    }
});

$('#inputSearch').keyup(function(){
    //window.openDatabase("database", "1.0", "Cordova Demo", 200000);
    db.transaction(searchByKeyword, errorCB, successCB);
    console.log(keyword);
    $('#display').html("");
    for(var k=0; k<keyword.length; k++){
        $('#display').append('<img accept=".jpg, .jpeg, .png, .svg, .JPG, .JPEG, .PNG, .SVG"  src="'+keyword[k].picture_url+'"alt="'+keyword[k].picture_name+'"/>');
    }
});

/***
 * Button Search Navbar
 */

$('#buttonSearch').on('click', function(){
    
});


/* =========================  FORMULAIRE  =======================  FORMULAIRE ======================================= */

/***
 * Button Choose a file Form
 */

$('#inputFile').on('click', cameraGetPicture,function(){
    console.log('branché');
});


/***
 * Button Confirm Form
 */

$('#confirmButton').on('click', function(){

});

