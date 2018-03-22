var express = require('express');
var router = express.Router();
const spawn = require("child_process").spawn;

/**
 * Création de réservation DHCP par @MAC sur srv-dhcp
 *
 * Récupère les paramètres id_reseau, ip, mac et description 
 * Execute le script Powershell de création de réservation DHCP en lui passant ces paramètres
**/
router.post('/', function(req, res, next) {
	var Promise = require('bluebird');

	var prom = new Promise(function(resolve, reject) {
	    var child = spawn("powershell.exe",["./bin/creationReservation.ps1", req.body.id_reseau, req.body.mac, req.body.ip, req.body.description]);
	    spawn.stdout.on('data', resolve);
	    spawn.stderr.on('data', (data) => {console.log(data); throw data});
	})
	.then((data) => res.json({status: "ok"}))
	.catch((e) => res.status(500).send(e));

	/*if(req.body.ip && req.body.id_reseau && req.body.mac && req.body.description){
		console.log(req.body.description);
		console.log(req.body.id_reseau);
		console.log(req.body.ip);
		console.log(req.body.mac);
		child = spawn("powershell.exe",["./bin/creationReservation.ps1", req.body.id_reseau, req.body.mac, req.body.ip, req.body.description]);
		
		child.stdout.on("data",function(data){
	    	console.log("Powershell Data: " + data);
		});
		
		console.log(child.stderr);
		child.stderr.on("data",function(data){
	    	console.log("Powershell Errors: " + data);
		});
		
		child.on("exit",function(){
	    	console.log("Powershell Script finished");
		});
		
		child.stdin.end(); //end input
		res.json({status: "ok"});

	}
 	else throw new Error(`Aie\n
 		ip : ${req.body.ip} 
 		id_reseau : ${req.body.id_reseau}
 		mac : ${req.body.mac}
 		description : ${req.body.description}
 	`);*/
});

/**
 * Suppression d'une réservation DHCP par @MAC sur srv-dhcp
 *
 * Récupère les paramètres id_reseau et mac 
 * Execute le script Powershell de suppression de réservation DHCP en lui passant ces paramètres
**/
router.delete('/', function(req, res, next){
	if(req.body.id_reseau_delete && req.body.mac_delete){

		child = spawn("powershell.exe",["./bin/suppressionReservation.ps1", req.body.id_reseau_delete, req.body.mac_delete]);
		
		child.stdout.on("data",function(data){
	    	console.log("Powershell Data: " + data);
		});
		
		child.stderr.on("data",function(data){
	    	res.status(500).send(data);
		});
		
		child.on("exit",function(){
	    	console.log("Powershell Script finished");
		});
		
		child.stdin.end(); //end input
		res.json({status: "ok"});
	}
	else throw new Error(`Aie\n
 		ip : ${req.body.ip} 
 		id_reseau : ${req.body.id_reseau}
 		mac : ${req.body.mac}
 		description : ${req.body.description}
 	`);

});

module.exports = router;
