/** 
*
* Lancement de l'application, appel à 1ère fonction
*
*/

document.addEventListener('deviceready', start, false);

/**  
 * 
 * Création et/ou lecture de la bdd locale 
 * 
*/
var db;

function start()
{
    db = window.openDatabase("data", "1.0", "data test", 200000);
    db.transaction(populateDB, errorCB, successCB);

    $('#orel').on("click", check);
}    

function check()
{
    console.log('essai acces DB');
    db.transaction(checkDB, errorCB, successCB);
}

function checkDB(tx)
{
    tx.executeSql('SELECT * FROM pictures;', [], function(tx, result){
        console.log('acces effectue');
        // console.log(result.rows[0]);
        $("#display").append("<img src='" + result.rows[0].data + "' alt='logo'></img>");
    });
}

function populateDB(tx)
{
    // tx.executeSql('DROP TABLE IF EXISTS pictures');
    // tx.executeSql('DROP TABLE IF EXISTS categories');
    // tx.executeSql('DROP TABLE IF EXISTS tags');
    // tx.executeSql('DROP TABLE IF EXISTS to_have');
    // tx.executeSql('DROP TABLE IF EXISTS to_belong');

    tx.executeSql("CREATE TABLE IF NOT EXISTS pictures (picture_id unique, picture_name, picture_url)");
    tx.executeSql("CREATE TABLE IF NOT EXISTS categories (category_id unique, category_name)");
    tx.executeSql("CREATE TABLE IF NOT EXISTS tags (tag_id unique, tag_name)");
    tx.executeSql("CREATE TABLE IF NOT EXISTS to_have (fk_picture INTEGER, fk_tag INTEGER, FOREIGN KEY(fk_picture) REFERENCES pictures (picture_id), FOREIGN KEY(fk_tag) REFERENCES tags (tag_id))");
    tx.executeSql("CREATE TABLE IF NOT EXISTS to_belong (fk_picture INTEGER, fk_category INTEGER, FOREIGN KEY(fk_picture) REFERENCES pictures(picture_id), FOREIGN KEY(fk_category) REFERENCES categories(category_id))");
    tx.executeSql("INSERT INTO pictures (picture_id, picture_name, picture_url) VALUES (1, 'Activités motrices', 'images/activités motrices.JPG')");
    tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (2,'Appeler','images/appeler.JPG')");
    tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (3,'Après','images/après.JPG')");
    tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (4,'Asperges 1','images/asperges 1.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (5,'Asperges 2 ','images/asperges 2.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (6,'Asperges vinaigrette ','images/asperges vinaigrette.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (7,'Atelier art','images/atelier art.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (8,'Atelier cuisine','images/atelier cuisine.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (9,'Atelier musique','images/atelier musique.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (10,'Ateliers cognitifs','images/ateliers cognitifs.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (11,'Atelier sport','images/atelier sport.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (12,'Bananes','images/bananes.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (13,'Boire','images/boire.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (14,'Bon','images/bon.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (15,'Bonnet','images/bonnet.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (16,'Bottes','images/bottes.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (17,'Bouchées à la reine','images/bouchées à la reine.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (18,'Boulettes à la viande','images/boulettes viande.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (19,'Brocolis','images/brocolis.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (20,'Café','images/café.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (21,'Café liegeois','images/café liégeois.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (22,'Calèche','images/calèche.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (23,'Carottes','images/carottes.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (24,'Casquette','images/casquette.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (25,'Casser','images/casser.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (26,'Cassoulet','images/cassoulet.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (27,'Chambre','images/chambre.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (28,'Chaussure','images/chaussures.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (29,'Choisir','images/choisir.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (30,'Choucroute','images/choucroute.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (31,'Choux de bruxelles','images/choux de bruxelles.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (32,'Choux farcis','/images/choux farcis.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (33,'Chou-fleur','/images/chou-fleur.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (34,'Cinéma','/images/cinéma.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (35,'Clémentines','/images/clémentines.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (36,'Courir','/images/courir.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (37,'Courses','/images/courses.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (38,'Crème dessert','/images/crème dessert.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (39,'Crêpes fromages','/images/crêpes fromage.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (40,'Croque-monsieur','/images/croque monsieur.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (41,'Cuisiner','/images/cuisiner.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (42,'Dentiste','/images/dentiste.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (43,'Douche','/images/douche.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (44,'Écouter de la musique','/images/écouter musique.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (45,'Endives au jambon ','/images/endives jambon.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (46,'Épinards','/images/épinards.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (47,'Équitation','/images/équitation.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (48,'Espace connaissances','/images/espace connaissance.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (49,'S\'essuyer les mains ','/images/essuyer les mains.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (50,'Fâché ','/images/fâché.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (51,'Faim','/images/faim.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (52,'Faire mal ','/images/faire mal.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (53,'Fini','/images/fini.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (54,'Foulard','/images/foulard.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (55,'Friand','/images/friand.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (56,'Frites','images/frites.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (57,'Froid','images/froid.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (59,'Fromage blanc','images/fromage blanc.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (60,'Fruits','images/fruits.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (61,'Funérailles','images/funérailles.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (62,'Gâteau au chocolat','images/gâteau chocolat.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (63,'Gâteau au yaourt','images/gâteau yaourt.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (64,'Glace 1','images/glace 1.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (65,'Glace 2','images/glace 2.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (66,'Grillades','images/grillades.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (67,'Hamburger','images/hamburger.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (68,'Haricots blancs','images/haricots blancs.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (69,'Il n\'y a pas','images/il n\'y a pas.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (70,'Infirmière','images/infirmière.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (71,'Interdit','images/interdit.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (72,'Je n\'aime pas','images/j\'aime pas.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (73,'Jambon blanc','images/jambon blanc.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (74,'Jambon de pays','images/jambon de pays.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (75,'Jeux seul','images/jeux seul.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (76,'Je veux','images/je veux.jpg')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (77,'Julienne','images/julienne.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (78,'La ferme','images/la ferme.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (79,'La messe','images/la messe.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (80,'Lasagnes','images/lasagnes.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (81,'Se laver le visage','images/laver le visage.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (82,'Le marché','images/le marché.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (83,'Lentilles saucisses','images/lentilles saucisses.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (84,'Maintenant','images/maintenant.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (85,'Manger','images/manger.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (86,'Manteau','images/manteau.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (87,'Marcher','images/marcher.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (88,'Masque','images/masque.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (89,'Mauvais','images/mauvais.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (90,'Mayonnaise','images/mayonnaise.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (91,'Melon','images/melon.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (92,'Menu','images/menu.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (93,'Merci','images/merci.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (94,'Mettre','images/mettre.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (95,'Moi','images/moi.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (96,'Monter','images/monter.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (97,'Mort','images/mort.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (98,'Moutarde','images/moutarde.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (99,'Noël','images/noel.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (100,'Oeufs','images/oeufs.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (101,'Omelette','images/omelette.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (102,'Ouvrir la bouche','images/ouvrir la bouche.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (103,'Paëlla','images/paella.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (104,'Pain de mie','images/pain de mie.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (105,'Pastèque','iamges/pastèque.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (106,'Pâté','images/pâté.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (107,'Petite assiette','images/petite assiette.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (108,'Petits pois','images/petits pois.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (109,'Piscine','images/piscine.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (110,'Pistolet','images/pistolet.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (111,'Pizzeria','images/pizzeria.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (112,'Pleurer','images/pleurer.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (113,'Poireaux','images/poireaux.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (114,'Pommes de terre','images/pommes de terre.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (115,'Pot au feu','images/pot au feu.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (116,'Prise de sang','images/prise de sang.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (117,'Pruneaux','images/pruneaux.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (118,'Psychologue','images/psychologue.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (119,'Purée','images/purée.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (120,'Quand','images/quand.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (121,'Radis','images/radis.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (122,'Raisin','images/raisin.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (123,'Ranger','images/ranger.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (124,'Rentrer à la maison','images/rentrer à la maison.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (125,'Restaurant','images/restaurant.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (126,'Riz au lait','images/riz au lait.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (127,'Salade d\'endives','images/salade d\'endives.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (128,'Salade de tomates','images/salade de tomates.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (129,'Salade de fruits','images/salade fruits.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (130,'S\'allonger','images/s\'allonger.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (131,'Salsifis','images/salsifis.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (132,'Sardines','images/sardines.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (133,'Se brosser les dents','images/se brosser les dents.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (134,'Se déshabiller','images/se déshabiller.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (135,'Se doucher','images/se doucher.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (136,'Se moucher','images/se moucher.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (137,'Se peser','images/se peser.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (138,'Se reposer','images/se reposer.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (139,'S\'habiller','images/s\'habiller.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (140,'Sport collectif','images/sport collectif.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (141,'Sport santé','images/sport santé.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (142,'Steack','images/steack.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (143,'Tablette','images/tablette.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (144,'Tarte','images/tarte.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (145,'Théâtre 1','images/théâtre 1.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (146,'Théâtre 2','images/théâtre 2.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (147,'Toilettes','images/toilettes.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (148,'Tourte','images/tourte.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (149,'Triste','images/triste.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (150,'Vaccin','images/vaccin.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (151,'Viande en sauce','images/viande en sauce.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (152,'Vous','images/vous.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (153,'Yaourts','images/yaourts.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (154,'Zumba','images/zumba.JPG')");
    // tx.executeSql("INSERT INTO pictures (picture_id,picture_name,picture_url) VALUES (155,'Judo','images/judo.JPG')");

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

    // tx.executeSql("INSERT INTO tags (tag_id, tag_name) VALUES (1, '')");
}

function errorCB(tx, err)
{
    alert("Error processing SQL: "+err);
}

function successCB()
{
    alert("success!");
    // console.log(cordova.file.dataDirectory);
    // console.log(cordova.file.applicationDirectory);
    // console.log(cordova.file.applicationStorageDirectory);
    //console.log(navigator.camera);
    
}

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

/**
 * Fonction événement, click pour intégrer une page html (form_html.html) à la page html par défaut index.html
 */

$('#admin').on("click", function(){
    // $('#display').append('<div id="mainForm"><form method="POST" action=""><div><legend id="legende">FORMULAIRE D\'INSERTION</legend></div><div class="form-group"><label for="image">1°) SÉLECTIONNER UNE IMAGE</label><input id="inputFile" type="file" accept=".jpg, .jpeg, .png, .svg" class="form-control-file" aria-describedby="fileHelp"></div><img src="" width="200" style="display:none;"/><div id="displayImagePath"></div><hr><div class="form-group"><label for="tag">2°) SÉLECTIONNER ET/OU CRÉER UN/PLUSIEURS TAGS</label><!-- formulaire select2 --><div><select id="selectTag" class="form-control" multiple="multiple"><option selected="selected" value="orange">Orange</option><option selected="selected" value="white">White</option><option selected="selected" value="brown">Brown</option><option selected="selected" value="purple">Purple</option><option selected="selected" value="grey">Grey</option><option selected="selected" value="black">Black</option><option selected="selected" value="yellow">Yellow</option></select></div><!-- <select class="form-control" id="insertTage"><option value="_">_</option><option value="tag 1">Tag 1</option><option value="tag 2">Tag 2</option><option value="tag 3">Tag 3</option><option value="tag 4">Tag 4</option><option value="tag 5">Tag 5</option></select><button class="btn btn-success" type="button">Insérer</button><input type="text" class="form-control" placeholder="insérer un tag" id="insertTagButton"><button class="btn btn-success" type="button">Insérer</button><textarea class="form-control" id="user_entry" rows="1" placeholder="Vos tags s\'affichent ici"></textarea> --></div><hr><div class="form-group"><label for="categorie">3°) SÉLECTIONNER ET/OU CRÉER UNE CATÉGORIE</label><!-- formulaire select2 --><div><select id="selectCategory" class="form-control" multiple="multiple"><option selected="selected" value="orange">Orange</option><option selected="selected" value="white">White</option><option selected="selected" value="brown">Brown</option><option selected="selected" value="purple">Purple</option><option selected="selected" value="grey">Grey</option><option selected="selected" value="black">Black</option><option selected="selected" value="yellow">Yellow</option></select></div><!-- <select class="form-control" id="insertCategory"><option value="_">_</option><option value="hygiene">Hygiène</option><option value="sante">Santé</option><option value="sport">Sport</option><option value="aliments">Aliments</option><option value="jeux">Jeux</option></select><button class="btn btn-success" type="button">Insérer</button><input type="text" class="form-control" placeholder="Insérer une catégorie" id="insertCategoryButton"><button class="btn btn-success" type="button">Insérer</button><textarea class="form-control" id="user_entry" rows="1" placeholder="Votre catégorie s\'affiche ici"></textarea> --></div><div><button id="confirmButton" type="submit" class="btn btn-success">Enregistrer</button></div></form></div>');
    // location.href="../form_html.html"; 
    $('#display').html("");
    $('#display').append('<iframe width="100%" height="600" sandbox="allow-scripts" seamless src="file:///android_asset/www/form_html.html">Le navigateur n\'est pas compatible></iframe>');
    // $('#display').append('<iframe width="100%" height="600" sandbox="allow-scripts" seamless src="../form_html.html">Le navigateur n\'est pas compatible></iframe>');

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

/**
 * Fonction événenement, au click, ouverture du gestionnaire de fichiers local
 */

function onDeviceReady(){
    // window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024*1024, successCB, errorHandler);
    $("#inputFile").addEventListener("click", cameraGetPicture);
}