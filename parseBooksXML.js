#!/usr/bin/env node

var fs = require('fs'),
  parseBooksXML = require('commander'),
  parser = require('xml2json');

parseBooksXML
  .version('0.0.1')
  .option('-f, --file [file]', 'Google Books XML File')
  .parse(process.argv);


if(!parseBooksXML.file || !fs.statSync(parseBooksXML.file).isFile()) {
  console.error('File does not exist');
  console.log(parseBooksXML.helpInformation());
  process.exit(1);
}

var booksXML = fs.readFileSync(parseBooksXML.file), books, isbns = '';

books = JSON.parse(parser.toJson(booksXML)).library.books;

for(var i = 0;i < books.book.length;i++) {
  var book = books.book[i];
 
  if(book.identifier) {
    isbns += book.identifier.value + ',';
  } else {
    console.error(book);
  } 
}

console.log(isbns);