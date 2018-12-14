document.addEventListener('deviceready', start, false);

var db;

var allPictures;
var allCategories;
var alltags;
var allToHave;
var allToBelong;

// function checkDb(tx)
// {
//     var isDbEmpty = true;
//     tx.executeSql('SELECT COUNT (*) FROM pictures', [], function(tx, result)
//     {
//         isDbEmpty = false;
//         console.log(isDbEmpty);
//     });
//     console.log(isDbEmpty);
//     //db.transaction(populateDB, errorCB, successCB);
// }

var isDbEmpty = true;

function start()
{

    $.ajax({
        type: "get",
        url: "js/pictures.json",
        dataType: "json"
    }).done(function(data)
    {
        allPictures = data;

        db = window.openDatabase("database", "1.0", "Cordova Demo", 200000);
        db.transaction(populateDB, errorCB, successCB);
        
        //$('#orel').on("click", check);
        //console.log(allPictures); 
    });

  
}    

// function check()
// {
//     console.log('Tu as cliqué');
//     db.transaction(checkContent, errorCB, successCB);
// }

// function checkContent(tx)
// {
//     tx.executeSql('SELECT * FROM pictures;', [], function(tx, result)
//     {
//         console.log('La base de données existe bel et bien');
//          console.log(result);
//          console.log(result.length);
//          console.log(result.rows);
//          console.log(result.rows.length)
//         for(var j = 0; j < result.length; j++)
//         {
//             console.log(result.rows[0]);
//         }
//     });
// }


function populateDB(tx)
{
    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS pictures (picture_id unique, picture_name, picture_url)");
        tx.executeSql("CREATE TABLE IF NOT EXISTS categories (category_id unique, category_name)");
        tx.executeSql("CREATE TABLE IF NOT EXISTS tags (tag_id unique, tag_name)");
        tx.executeSql("CREATE TABLE IF NOT EXISTS to_have (fk_picture INTEGER, fk_tag INTEGER, FOREIGN KEY(fk_picture) REFERENCES pictures (picture_id), FOREIGN KEY(fk_tag) REFERENCES tags (tag_id))");
        tx.executeSql("CREATE TABLE IF NOT EXISTS to_belong (fk_picture INTEGER, fk_category INTEGER, FOREIGN KEY(fk_picture) REFERENCES pictures(picture_id), FOREIGN KEY(fk_category) REFERENCES categories(category_id))");
        tx.executeSql('SELECT * FROM pictures', [], function(tx, result)
        {
            console.log(result);
            console.log(result.length);
            console.log(result.rows);
            console.log(result.rows.length)
            isDbEmpty = false;
            console.log(isDbEmpty);
        })
    }, 
    function(error) 
    {
        console.log('Transaction ERROR: ' + error.message);
    }, 
    function(isDbEmpty) 
    {
        console.log(isDbEmpty);
    });    

    //if(isDbEmpty === true)
    for(var i = 0; i < allPictures.length; i++)
    {
        var sql = 'INSERT INTO pictures (picture_id, picture_name, picture_url) VALUES (' 
        + allPictures[i].picture_id + ', "' + allPictures[i].picture_name + '", "' + allPictures[i].picture_url + '")';
        tx.executeSql(sql);
    }     
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (2,'Aliments')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (3,'Actions')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (4,'Activités')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (5,'Hygiène')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (6,'Santé')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (7,'Sorties')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (8,'Loisirs')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (9,'Humeurs')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (10,'Temps')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (11,'Interdits')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (12,'Interactions')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (13,'Sports')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (14,'Lieux')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (15,'Événements')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (16,'Objets')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (17,'Habits')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (18,'Gestes')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (19,'Interactions avec les professionnels')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (20,'Émotions')");
    tx.executeSql("INSERT INTO categories (category_id, category_name) VALUES (21,'États')");
    console.log('DB populated !');
}

function errorCB(tx, err)
{
    console.log('Erreur ! Merci de vérifier la console pour plus d\'informations...');
    console.log(tx);
    console.log(err);
}

function successCB(tx)
{
    console.log(tx);
    alert("success!");
}

// /************************                     FONCTIONS ADE                   ******************************/

//  /**
//  * Fonction événement, click pour intégrer une page html (form_html.html) à la page html par défaut index.html
//  */

// $('#admin').on("click", function(){
//     // $('#display').append('<div id="mainForm"><form method="POST" action=""><div><legend id="legende">FORMULAIRE D\'INSERTION</legend></div><div class="form-group"><label for="image">1°) SÉLECTIONNER UNE IMAGE</label><input id="inputFile" type="file" accept=".jpg, .jpeg, .png, .svg" class="form-control-file" aria-describedby="fileHelp"></div><img src="" width="200" style="display:none;"/><div id="displayImagePath"></div><hr><div class="form-group"><label for="tag">2°) SÉLECTIONNER ET/OU CRÉER UN/PLUSIEURS TAGS</label><!-- formulaire select2 --><div><select id="selectTag" class="form-control" multiple="multiple"><option selected="selected" value="orange">Orange</option><option selected="selected" value="white">White</option><option selected="selected" value="brown">Brown</option><option selected="selected" value="purple">Purple</option><option selected="selected" value="grey">Grey</option><option selected="selected" value="black">Black</option><option selected="selected" value="yellow">Yellow</option></select></div><!-- <select class="form-control" id="insertTage"><option value="_">_</option><option value="tag 1">Tag 1</option><option value="tag 2">Tag 2</option><option value="tag 3">Tag 3</option><option value="tag 4">Tag 4</option><option value="tag 5">Tag 5</option></select><button class="btn btn-success" type="button">Insérer</button><input type="text" class="form-control" placeholder="insérer un tag" id="insertTagButton"><button class="btn btn-success" type="button">Insérer</button><textarea class="form-control" id="user_entry" rows="1" placeholder="Vos tags s\'affichent ici"></textarea> --></div><hr><div class="form-group"><label for="categorie">3°) SÉLECTIONNER ET/OU CRÉER UNE CATÉGORIE</label><!-- formulaire select2 --><div><select id="selectCategory" class="form-control" multiple="multiple"><option selected="selected" value="orange">Orange</option><option selected="selected" value="white">White</option><option selected="selected" value="brown">Brown</option><option selected="selected" value="purple">Purple</option><option selected="selected" value="grey">Grey</option><option selected="selected" value="black">Black</option><option selected="selected" value="yellow">Yellow</option></select></div><!-- <select class="form-control" id="insertCategory"><option value="_">_</option><option value="hygiene">Hygiène</option><option value="sante">Santé</option><option value="sport">Sport</option><option value="aliments">Aliments</option><option value="jeux">Jeux</option></select><button class="btn btn-success" type="button">Insérer</button><input type="text" class="form-control" placeholder="Insérer une catégorie" id="insertCategoryButton"><button class="btn btn-success" type="button">Insérer</button><textarea class="form-control" id="user_entry" rows="1" placeholder="Votre catégorie s\'affiche ici"></textarea> --></div><div><button id="confirmButton" type="submit" class="btn btn-success">Enregistrer</button></div></form></div>');
//     // location.href="../form_html.html"; 
//     $('#display').html("");
//     $('#display').append('<iframe width="100%" height="600" sandbox="allow-scripts" seamless src="file:///android_asset/www/form_html.html">Le navigateur n\'est pas compatible></iframe>');
//     // $('#display').append('<iframe width="100%" height="600" sandbox="allow-scripts" seamless src="../form_html.html">Le navigateur n\'est pas compatible></iframe>');

// });

// /**
//  * Récupérer une image du gestionnaire de fichier de la tablette
//  * 
//  */
// function cameraGetPicture() {
//     navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
//         destinationType: Camera.DestinationType.FILE_URI,
//         sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
//         targetWidth: 100,
//         targetHeight: 100
//     });

//     function onSuccess(imageURL) {
//         var image = document.getElementById('myImage');
//         image.src = imageURL;
//     }

//     function onFail(message) {
//         alert('Failed because: ' + message);
//     }

// }

// /**
//  * Fonction événenement, au click, ouverture du gestionnaire de fichiers local
//  */

// function onDeviceReady(){
//     // window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024*1024, successCB, errorHandler);
//     $("#inputFile").addEventListener("click", cameraGetPicture);
// }

// /*************************************************************************************************************** */