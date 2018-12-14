// FORM
// reset form at startup
//  function resetForm()
//     {
//     document.getElementById('#mainForm').reset();
// }
//
// resetForm();

// IMAGE PATH
// display the thumbnail of the image and the image path
$('#inputFile').change( function(event)
    {
    var imagePath = URL.createObjectURL(event.target.files[0]);
    $("img").fadeIn("fast").attr({src:URL.createObjectURL(event.target.files[0]),id:"newImg"});
    $("#displayImagePath").html("<strong>" + imagePath + "</strong>");

    console.log(imagePath);
});

// TAGS
// display and creation of tags in the same input
$('#selectTag').select2(
    {
    placeholder: "Sélectionner / saisir un tag",
    tags: true,
    tokenSeparators: [',', ' ']
});

// display tags names in the console
$("#selectTag").on("select2:select", function (e)
    { 
    var select_value_tag = $(e.currentTarget).val();
    console.log(select_value_tag)
});

// CATEGORIES
// display and creation of categories in the same input
$('#selectCategory').select2(
    {
    placeholder: "Sélectionner / saisir une catégorie",
    tags: true,
    tokenSeparators: [',', ' ']
});

// display categories names in the console
$("#selectCategory").on("select2:select", function (e)
    { 
    var select_value_category = $(e.currentTarget).val();
    console.log(select_value_category)
});

$('#selectCategory').one('click', function(){
    db.transaction(searchAllCategories, errorCB, successCB);
    console.log(categories);
    for(var z=0; z<categories.length; z++){
        $('#selectCategory').append('<option id="'+categories[z].category_id+'" value="'+categories[z].category_id+'">'+categories[z].category_name+'</option>');
    }
    return categories;
});

function onDeviceReady(){
    // window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024*1024, successCB, errorHandler);
    $("#inputFile").on("click", cameraGetPicture);
}

function displayCategories()
{
    db.transaction(searchAllCategories, errorCB, function()
    {
        console.log(categories);
        for(var i = 0; i < categories.length; i++)
        {
            $("#selectCategory").append("<option value='" + categories[i].category_id + "'>" + categories[i].category_name + "</option>");
        }
    });
}

displayCategories();

onDeviceReady();
