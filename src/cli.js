// O arquivo CLI por sua vez, deve importar e USAR a função mdlinks que foi feita no index.js.. 
// pegar se tem os argumentos --validate e/ou --stats pra então printar no terminal as informações necessarias. 
// E aqui vcs podem usar o chalk pra colorir ou qualquer outra lib pra mostrar as infos no terminal.

const { mdLinks } = require ("./index.js")

const chalk = require("chalk");

const filePath = "./src/arquivo.md"

const options = {
  validate: process.argv.includes("--validate"),
  stats: process.argv.includes("--stats")
}

function messages(options, links) {
  if (!options.stats && !options.validate){
    links.forEach ((link)=>{
      console.log(chalk.yellow('file:' + link.file));
      console.log(chalk.magenta('text:' + link.text));
      console.log(chalk.cyan('link:' + link.href));
    });
  } else if (!options.stats && options.validate){
    links.forEach ((link)=>{
      console.log(chalk.yellow('file:' + link.file));
      console.log(chalk.magenta('text:' + link.text));
      console.log(chalk.cyan('link:' + link.href));
      console.log(chalk.white("status: " + link.status));
      console.log(chalk.white("ok: " + link.ok));
    });
  }
  return messages(options, urls)
}


mdLinks(filePath, options)
.then(link => console.log (link))
  



  // .then((results) => {
  //    if (options.validate){
  //     results.forEach((link) => {
  //       console.log(chalk.yellow('file:' + link.file));
  //       console.log(chalk.magenta('text:' + link.text));
  //       console.log(chalk.cyan('link:' + link.href));
  //       console.log(chalk.green('status HTTP:' + link.status))
  //       console.log(chalk.green('OK:' + link.ok))
  //       console.log('¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
  //     });

  //   } else {
  //     results.forEach((link) => {
  //       console.log(chalk.yellow('file:' + link.file));
  //       console.log(chalk.magenta('text:' + link.text));
  //       console.log(chalk.cyan('link:' + link.href));
  //       console.log('¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')      
  //     })
  //   }
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
