#!/usr/bin/env node

var fs = require('fs'),
  parseBooksXML = require('commander'),
  expat = require('node-expat');

parseBooksXML
  .version('0.0.1')
  .option('-f, --file [file]', 'Google Books XML File')
  .parse(process.argv);


if(!parseBooksXML.file || !fs.statSync(parseBooksXML.file).isFile()) {
  console.error('File does not exist');
  process.exit(1);
}

var booksXML = fs.readFileSync(parseBooksXML.file),
p = new expat.Parser("utf-8"),
books;

books = p.parse(booksXML);
