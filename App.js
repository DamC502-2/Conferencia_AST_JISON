const open = require('open');
const fs = require('fs');
const { exec } = require("child_process");


const parser = require('./gramatica.js')
//const raiz = parser.parse("graficar(13+58-221+ad);");
//const raiz = parser.parse("graficar({1,2,3,4});");
//const raiz = parser.parse("graficar((1,2,3,4));");
const raiz = parser.parse("graficar((1,2,3,4)+{1,2,3,4});");
const archivo = 'temp.txt'
const contenido = `digraph G { 
    graph [ratio=.548];
    node [style=filled, color=black, shape=circle, width=1
        fontname=Helvetica, fontweight=bold, fontcolor=black,
        fontsize=10, fixedsize=true];
`+ raiz.graficar() + " \n }";

fs.writeFile(archivo, contenido, err => {
    if (err) {
     console.error('Falló escribir el archivo ', err);
    } else console.log('archivo creado correctamente');
   });

exec("dot -Tsvg temp.txt -o temp.svg", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    open("temp.svg")
});
