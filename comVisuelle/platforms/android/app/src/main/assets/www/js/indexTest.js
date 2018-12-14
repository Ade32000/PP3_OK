document.addEventListener('deviceready', start, false);

var db;
var res;

function start()
{
    db = window.openDatabase("database", "1.0", "Cordova Demo", 200000);
    // db.transaction(checkDb, errorCB, successCB);
    //db.transaction(populateDB, errorCB, successCB);
    db.transaction(checkContent, errorCB, successCB);
    
    // $('#navbarDropdown').on("click", check);
}    

function check()
{
    console.log('essai acces DB');
    db.transaction(checkContent, errorCB, successCB);
}

function checkContent(tx)
{
    
    tx.executeSql('SELECT * FROM categories;', [], function(tx, result){
        console.log(result.rows);
        res = result.rows;
        console.log('coucou');
        return res;
    });
}

function populateDB(tx)
{
    // tx.executeSql('INSERT INTO test (test_id, test_name) VALUES (2,"ceci est un test")');
}

function errorCB(tx, err)
{
    alert(err);
}

function successCB()
{
    alert("success!");
}


$('#admin').on("click", function(){
    // $('#display').append('<div id="mainForm"><form method="POST" action=""><div><legend id="legende">FORMULAIRE D\'INSERTION</legend></div><div class="form-group"><label for="image">1°) SÉLECTIONNER UNE IMAGE</label><input id="inputFile" type="file" accept=".jpg, .jpeg, .png, .svg" class="form-control-file" aria-describedby="fileHelp"></div><img src="" width="200" style="display:none;"/><div id="displayImagePath"></div><hr><div class="form-group"><label for="tag">2°) SÉLECTIONNER ET/OU CRÉER UN/PLUSIEURS TAGS</label><!-- formulaire select2 --><div><select id="selectTag" class="form-control" multiple="multiple"><option selected="selected" value="orange">Orange</option><option selected="selected" value="white">White</option><option selected="selected" value="brown">Brown</option><option selected="selected" value="purple">Purple</option><option selected="selected" value="grey">Grey</option><option selected="selected" value="black">Black</option><option selected="selected" value="yellow">Yellow</option></select></div><!-- <select class="form-control" id="insertTage"><option value="_">_</option><option value="tag 1">Tag 1</option><option value="tag 2">Tag 2</option><option value="tag 3">Tag 3</option><option value="tag 4">Tag 4</option><option value="tag 5">Tag 5</option></select><button class="btn btn-success" type="button">Insérer</button><input type="text" class="form-control" placeholder="insérer un tag" id="insertTagButton"><button class="btn btn-success" type="button">Insérer</button><textarea class="form-control" id="user_entry" rows="1" placeholder="Vos tags s\'affichent ici"></textarea> --></div><hr><div class="form-group"><label for="categorie">3°) SÉLECTIONNER ET/OU CRÉER UNE CATÉGORIE</label><!-- formulaire select2 --><div><select id="selectCategory" class="form-control" multiple="multiple"><option selected="selected" value="orange">Orange</option><option selected="selected" value="white">White</option><option selected="selected" value="brown">Brown</option><option selected="selected" value="purple">Purple</option><option selected="selected" value="grey">Grey</option><option selected="selected" value="black">Black</option><option selected="selected" value="yellow">Yellow</option></select></div><!-- <select class="form-control" id="insertCategory"><option value="_">_</option><option value="hygiene">Hygiène</option><option value="sante">Santé</option><option value="sport">Sport</option><option value="aliments">Aliments</option><option value="jeux">Jeux</option></select><button class="btn btn-success" type="button">Insérer</button><input type="text" class="form-control" placeholder="Insérer une catégorie" id="insertCategoryButton"><button class="btn btn-success" type="button">Insérer</button><textarea class="form-control" id="user_entry" rows="1" placeholder="Votre catégorie s\'affiche ici"></textarea> --></div><div><button id="confirmButton" type="submit" class="btn btn-success">Enregistrer</button></div></form></div>');
    // location.href="../form_html.html"; 
    $('#display').html("");
    $('#display').append('<iframe width="100%" height="600" sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals" seamless src="file:///android_asset/www/form_html.html">Le navigateur n\'est pas compatible></iframe>');
    // $('#display').append('<iframe width="100%" height="600" sandbox="allow-scripts" seamless src="../form_html.html">Le navigateur n\'est pas compatible></iframe>');

});

