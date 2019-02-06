var db = window.openDatabase("database", "1.0", "Cordova Demo", 200000);

var allPictures;
var allCategories;
var alltags;
var allToHave;
var allToBelong;
var category;

//cette fonction importe les données des fichiers json grâce à des requêtes ajax et éxécute les fonctions
//qui remplissent les tables
function fillDB(tx)
{
    console.log("je remplie la db");
    $.ajax({
        type: "get",
        url: "json/pictures.json",
        dataType: "json"
    }).done(function(data)
    {
        console.log(data)
        allPictures = data;
        db.transaction(fillPictures, errorCB, successCB);
    });

    $.ajax({
        type: "get",
        url: "json/categories.json",
        dataType: "json"
    }).done(function(data1)
    {
        console.log(data1)
        allCategories = data1;
        db.transaction(fillCategories, errorCB, successCB);
    });
    
    $.ajax({
        type: "get",
        url: "json/to_belong.json",
        dataType: "json"
    }).done(function(data2)
    {
        console.log(data2)
        allToBelong = data2;
        db.transaction(fillToBelong, errorCB, successCB);
    });

    $.ajax({
        type: "get",
        url: "json/tags.json",
        dataType: "json"
    }).done(function(data3)
    {
        console.log(data3)
        alltags = data3;
        db.transaction(fillTags, errorCB, successCB);
    });

    $.ajax({
        type: "get",
        url: "json/to_have.json",
        dataType: "json"
    }).done(function(data4)
    {
        console.log(data4)
        allToHave = data4;
        db.transaction(fillToHave, errorCB, successCB);
    });       
}

function errorCB(err)
{
    console.log(err);
}

function successCB()
{
    console.log("success!");
}

//remplie la table pictures avec les données du json
function fillPictures(tx)
{
    tx.executeSql("DROP TABLE IF EXISTS pictures");
    tx.executeSql("CREATE TABLE IF NOT EXISTS pictures (picture_id unique, picture_name, picture_url)");
    for(var i = 0; i < allPictures.length; i++)
    {
        console.log("je boucle dans pictures");
        var sql = 'INSERT INTO pictures VALUES (' + 
        allPictures[i].picture_id + ', "' + allPictures[i].picture_name + '", "' + allPictures[i].picture_url + '")';
        tx.executeSql(sql);
    }
}

//remplie la table categories avec les données du json
function fillCategories(tx)
{
    tx.executeSql("DROP TABLE IF EXISTS categories");
    tx.executeSql("CREATE TABLE IF NOT EXISTS categories (category_id unique, category_name)");
    for(var i = 0; i < allCategories.length; i++)
    {
        console.log("je boucle dans categories");
        var sql = 'INSERT INTO categories (category_id, category_name) VALUES (' 
        + allCategories[i].category_id + ', "' + allCategories[i].category_name + '")';
        tx.executeSql(sql);
    }
}

//remplie la table to_belong avec les données du json
function fillToBelong(tx)
{
    tx.executeSql("DROP TABLE IF EXISTS to_belong");
    tx.executeSql("CREATE TABLE IF NOT EXISTS to_belong (fk_picture INTEGER, fk_category INTEGER, FOREIGN KEY(fk_picture) REFERENCES pictures(picture_id), FOREIGN KEY(fk_category) REFERENCES categories(category_id))");
    for(var i = 0; i < allToBelong.length; i++)
    {
        console.log("je boucle dans to_belong");
        var sql = 'INSERT INTO to_belong (fk_category, fk_picture) VALUES (' 
        + allToBelong[i].fk_category + ', "' + allToBelong[i].fk_picture + '")';
        tx.executeSql(sql);
    };
}

//remplie la table to_have avec les données du json
function fillTags(tx)
{
    tx.executeSql("DROP TABLE IF EXISTS tags");
    tx.executeSql("CREATE TABLE IF NOT EXISTS tags (tag_id unique, tag_name)");
    for(var i = 0; i < alltags.length; i++)
    {
        console.log("je boucle dans tags");
        var sql = 'INSERT INTO tags (tag_id, tag_name) VALUES (' 
        + alltags[i].tag_id + ', "' + alltags[i].tag_name + '")';
        tx.executeSql(sql);
    }
}

//remplie la table to_have avec les données du json
function fillToHave(tx)
{
    tx.executeSql("DROP TABLE IF EXISTS to_have");
    tx.executeSql("CREATE TABLE IF NOT EXISTS to_have (fk_picture INTEGER, fk_tag INTEGER, FOREIGN KEY(fk_picture) REFERENCES pictures (picture_id), FOREIGN KEY(fk_tag) REFERENCES tags (tag_id))");
    for(var i = 0; i < allToHave.length; i++)
    {
        console.log("je boucle dans to have");
        var sql = 'INSERT INTO to_have (fk_picture, fk_tag) VALUES (' 
        + allToHave[i].fk_picture + ', ' + allToHave[i].fk_tag + ')';
        tx.executeSql(sql);
    }
}