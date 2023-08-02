// index.js
// aqui terá a função mdLinks que será exportada... 
// ela deve retornar apenas uma ARRAY de OBJETOS!
// Coloca esse codigo index.js e executa com `node index.js`


// o --validate é do cli.. a função mdlinks ela tem uma validação, mas ela só retornar uma array de objetos com essas props
//  [{ href, text, file, status, ok }, ...]


// const axios = require('axios');
const fs = require("fs");
const path = require("path");

function findMdFileURLs(filePath){
  console.log (filePath)
  const absolutePath = path.resolve(filePath);
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (error, fileContent) => {
      if (!filePath.endsWith(".md")) {
        reject(new Error("Nenhum arquivo md encontrado"));
        return;
      }

      const urlRegex = /\[([^\]]*)\]\(https?:\/\/[^$#\s].[^\s]*\)/gm;
      let matches = [];
      let match;
      console.log (fileContent)
      while ((match = urlRegex.exec(fileContent)) !== null) {
      matches.push(match);
      }

      const results = matches.map((match) => ({
        href: match[2],
        text: match[1],
        file: absolutePath,
      }));
      resolve(results);
    });
  });
}

function validateMdLink(url, text, file) {
  return axios.get(url)
    .then((response) => ({
      href: url,
      text: text,
      file: file,
      status: response.status === 200 ? "ok" : "error",
      ok: response.status === 200 ? "ok" : "fail",
    }))
    .catch((error) => ({
      href: url,
      text: text,
      file: file,
      status: "error",
      ok: "fail",
    }));
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
  
}

function mdLinks(filePath, options = { validate: false }) {
  const absolutePath = path.resolve(filePath);
  return findMdFileURLs(absolutePath)
    .then((urls) => {
      if (options.validate) {
        let promises = urls.map(url => validateMdLink(url.href, url.text, url.file));
        return Promise.all(promises);
      } else {
        return messages(options, urls);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

module.exports = {
  findMdFileURLs,
  validateMdLink,
  mdLinks
}