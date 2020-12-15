/**
 * Módulos são conjuntos de códigos
 * 3 Tipos de módulos
 * -> TODOS OS ARQUIVOS JAVASCRIPT SÃO MÓDULOS;
 * -> NATIVOS;
 * -> NPM (NODE PACKAGE MANAGER)
 */

const os = require('os');

const { printName, lastName } = require('./printName');

printName(`Bruno ${lastName}`);

console.log(os.hostname());

