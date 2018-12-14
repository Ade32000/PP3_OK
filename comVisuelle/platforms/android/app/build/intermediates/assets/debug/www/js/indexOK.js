document.addEventListener('deviceready', start, false);

var db = window.openDatabase("database", "1.0", "Cordova Demo", 200000);
var test;

var allPictures;
var allCategories;
var alltags;
var allToHave;
var allToBelong;

var categories;
var pictures;
var keyword;
var str = "";

function start()
{
    
    db.transaction(checkDb, errorCB, successCB);
    // db.transaction(resetDb, errorCB, successCB);

    
} 

function resetDb(tx)
{
    // tx.executeSql('DROP TABLE IF EXISTS pictures');
    // tx.executeSql('DROP TABLE IF EXISTS categories');
    // tx.executeSql('DROP TABLE IF EXISTS tags');
    // tx.executeSql('DROP TABLE IF EXISTS to_have');
    // tx.executeSql('DROP TABLE IF EXISTS to_belong');
    // tx.executeSql('DROP TABLE IF EXISTS test');
    tx.executeSql("CREATE TABLE IF NOT EXISTS test (test_id unique, test_check)");
    tx.executeSql("INSERT INTO test (test_id,test_check) VALUES (1,'True')");

}

/* True = bdd pleine */
function checkDb(tx)
{
    tx.executeSql('SELECT test_check FROM test WHERE test_id=1;',[],function(tx,result){
        test = result.rows;
        console.log(test);
        if(test[0].test_check == "False")
        {
            alert("La base de donnée est à jour!");
            db.transaction(searchAllCategories, errorCB, successCB);
            db.transaction(searchAllPictures, errorCB, successCB);
            //db.transaction(searchByKeyword, errorCB, successCB);

        }
        else
        {
            console.log('c\'est ici');

            $.ajax({
                type: "get",
                url: "js/pictures.json",
                dataType: "json"
            }).done(function(data)
            {

                allPictures = data;
                db.transaction(populateDB, errorCB, successDB);
            });

            $.ajax({
                type: "get",
                url: "js/categories.json",
                dataType: "json"
            }).done(function(data1)
            {
                allCategories = data1;
                db.transaction(populateDB, errorCB, successDB);
            });

            $.ajax({
                type: "get",
                url: "js/tags.json",
                dataType: "json"
            }).done(function(data2)
            {
                alltags = data2;
                db.transaction(populateDB, errorCB, successDB);
            });

            $.ajax({
                type: "get",
                url: "js/to_belong.json",
                dataType: "json"
            }).done(function(data3)
            {
                allToBelong = data3;
                db.transaction(populateDB, errorCB, successDB);

            });

        }
    });
}

function errorCB(tx, err)
{
    console.log(err);
}

function successCB()
{
    console.log("success!");
}

function successDB()
{
    alert("Base de donnée mise à jour avec succès!");
}

function populateDB(tx)
{
    console.log('je dois être remplie');

    tx.executeSql("CREATE TABLE IF NOT EXISTS pictures (picture_id unique, picture_name, picture_url)");
    tx.executeSql("CREATE TABLE IF NOT EXISTS categories (category_id unique, category_name)");
    tx.executeSql("CREATE TABLE IF NOT EXISTS tags (tag_id unique, tag_name)");
    tx.executeSql("CREATE TABLE IF NOT EXISTS to_have (fk_picture INTEGER, fk_tag INTEGER, FOREIGN KEY(fk_picture) REFERENCES pictures (picture_id), FOREIGN KEY(fk_tag) REFERENCES tags (tag_id))");
    tx.executeSql("CREATE TABLE IF NOT EXISTS to_belong (fk_picture INTEGER, fk_category INTEGER, FOREIGN KEY(fk_picture) REFERENCES pictures(picture_id), FOREIGN KEY(fk_category) REFERENCES categories(category_id))");
    tx.executeSql("CREATE TABLE IF NOT EXISTS test (test_id unique, test_check)");
    

    for(var i = 0; i < allPictures.length; i++)
    {
        var sql = 'INSERT INTO pictures (picture_id, picture_name, picture_url) VALUES (' 
        + allPictures[i].picture_id + ', "' + allPictures[i].picture_name + '", "' + allPictures[i].picture_url + '")';
        tx.executeSql(sql);
    }
    for(var i = 0; i < allCategories.length; i++)
    {
        var sql = 'INSERT INTO categories (category_id, category_name) VALUES (' 
        + allCategories[i].category_id + ', "' + allCategories[i].category_name + '")';
        tx.executeSql(sql);
    }
    for(var i = 0; i < alltags.length; i++)
    {
        var sql = 'INSERT INTO tags (tag_id, tag_name) VALUES (' 
        + alltags[i].tag_id + ', "' + alltags[i].tag_name + '")';
        tx.executeSql(sql);
    }
    for(var i = 0; i < allToBelong.length; i++)
    {
        var sql = 'INSERT INTO to_belong (category_id, picture_id) VALUES (' 
        + allToBelong[i].category_id + ', "' + allToBelong[i].picture_id + '")';
        tx.executeSql(sql);
    }

    tx.executeSql("INSERT INTO test (test_id,test_check) VALUES (1,'True')");

}




function searchAllCategories(tx)
{
    tx.executeSql('SELECT * FROM categories ORDER BY category_name ASC;', [], function(tx, result){
        categories = result.rows;
        console.log(categories);
        // for(var c=0;c<categories.length;c++)
        // {
        //     data1.push({
        //         "id": categories[c].category_id,
        //         "text": categories[c].category_name
        //     });
        // }
        
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
    console.log(str);
    var byCategory = [];
    var catId = parseInt(str);
    tx.executeSql('SELECT picture_id FROM to_belong WHERE category_id='+catId+';', [], function(tx, result){
        var pic_in_cat = result.rows;

        for (var i=0; i<pic_in_cat.length; i++)
        {
            tx.executeSql('SELECT * FROM pictures WHERE picture_id='+pic_in_cat[i]+';',[],function(tx,result){
                byCategory.push(result.rows);
            });
        }
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


$("select").change(function () {
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
        targetWidth: 100,
        targetHeight: 100
    });

    function onSuccess(imageURL) {
        var image = document.getElementById('myImage');
        image.src = imageURL;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }

}


