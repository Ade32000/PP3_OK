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
        allPictures = data;
        db.transaction(fillPictures, errorCB, successCB);
    });

    $.ajax({
        type: "get",
        url: "json/categories.json",
        dataType: "json"
    }).done(function(data1)
    {
        allCategories = data1;
        db.transaction(fillCategories, errorCB, successCB);
    });

    $.ajax({
        type: "get",
        url: "json/to_belong.json",
        dataType: "json"
    }).done(function(data3)
    {
        console.log(data3);
        allToBelong = data3;
        db.transaction(fillToBelong, errorCB, successCB);
        db.transaction(selectToBelong, errorCB, successCB);
    });

    $.ajax({
        type: "get",
        url: "json/tags.json",
        dataType: "json"
    }).done(function(data4)
    {
        alltags = data4;
        db.transaction(fillTags, errorCB, successCB);
    });

    $.ajax({
        type: "get",
        url: "json/to_have.json",
        dataType: "json"
    }).done(function(data5)
    {
        allToHave = data5;
        console.log(allToHave);
        db.transaction(fillToHave, errorCB, successCB);
        db.transaction(selectToHave, errorCB, successCB);
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

function selectToBelong(tx)
{
    tx.executeSql("SELECT * FROM to_belong", [], function(tx, result)
    {
        console.log(result.rows);
    });
}

function selectToHave(tx)
{
    tx.executeSql("SELECT * FROM to_have", [], function(tx, result)
    {
        console.log(result.rows);
    });
}

//remplie la table pictures avec les données du json
function fillPictures(tx)
{
    tx.executeSql("CREATE TABLE IF NOT EXISTS pictures (picture_id unique, picture_name, picture_url)");
    for(var i = 0; i < allPictures.length; i++)
    {pictures
        var sql = 'INSERT INTO pictures (picture_id, picture_name, picture_url) VALUES (' 
        + allPictures[i].picture_id + ', "' + allPictures[i].picture_name + '", "' + allPictures[i].picture_url + '")';
        tx.executeSql(sql);
    }
}

//remplie la table categories avec les données du json
function fillCategories(tx)
{
    tx.executeSql("CREATE TABLE IF NOT EXISTS categories (category_id unique, category_name)");
    for(var i = 0; i < allCategories.length; i++)
    {
        var sql = 'INSERT INTO categories (category_id, category_name) VALUES (' 
        + allCategories[i].category_id + ', "' + allCategories[i].category_name + '")';
        tx.executeSql(sql);
    }
}

//remplie la table to_belong avec les données du json
function fillToBelong(tx)
{
    console.log(allToBelong);
    tx.executeSql("DROP TABLE to_belong IF EXISTS");
    tx.executeSql("CREATE TABLE IF NOT EXISTS to_belong (fk_picture INTEGER, fk_category INTEGER, FOREIGN KEY(fk_picture) REFERENCES pictures(picture_id), FOREIGN KEY(fk_category) REFERENCES categories(category_id))");
    for(var i = 0; i < allToBelong.length; i++)
    {
        var sql = 'INSERT INTO to_belong (fk_category, fk_picture) VALUES (' 
        + allToBelong[i].fk_category + ', "' + allToBelong[i].fk_picture + '")';
        tx.executeSql(sql);
    };
}

function checkIfTablesExist(tx)
{
    tx.executeSql("SELECt * FROM pictures", [], function(tx, result)
    {
        console.log("Je select * from picture");
        console.log(result.rows);
    });
}

// function ifDBDoesntExists()
// {
//     console.log("creating db");
//     db.transaction(fillDB, errorCB, executeScan);
// }

// function ifDBExists()
// {
//     console.log("la bdd existe");
//     db.transaction(destroyDB, errorCB, successCB);
// }

//remplie la table to_have avec les données du json
function fillTags(tx)
{
    tx.executeSql("CREATE TABLE IF NOT EXISTS tags (tag_id unique, tag_name)");
    for(var i = 0; i < alltags.length; i++)
    {
        var sql = 'INSERT INTO tags (tag_id, tag_name) VALUES (' 
        + alltags[i].tag_id + ', "' + alltags[i].tag_name + '")';
        tx.executeSql(sql);
    }
}

//remplie la table to_have avec les données du json
function fillToHave(tx)
{
    console.log(allToHave);
    tx.executeSql("DROP TABLE to_have IF EXISTS");
    tx.executeSql("CREATE TABLE IF NOT EXISTS to_have (fk_picture INTEGER, fk_tag INTEGER, FOREIGN KEY(fk_picture) REFERENCES pictures (picture_id), FOREIGN KEY(fk_tag) REFERENCES tags (tag_id))");
    for(var i = 0; i < allToHave.length; i++)
    {
        var sql = 'INSERT INTO to_have (fk_picture, fk_tag) VALUES (' 
        + allToHave[i].fk_picture + ', ' + allToHave[i].fk_tag + ')';
        tx.executeSql(sql);
    }
}