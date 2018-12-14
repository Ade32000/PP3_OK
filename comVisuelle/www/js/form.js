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



function onDeviceReady(){
    // window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024*1024, successCB, errorHandler);
    $("#inputFile").addEventListener("click", cameraGetPicture);
}
