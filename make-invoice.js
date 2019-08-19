const fs = require('fs')
const handlebars = require('handlebars')
const minimist = require('minimist')
const path = require('path')
const puppeteer = require('puppeteer')

function die(error) {
    process.stderr.write('Error: ' + error)
    process.exit(1)
}

function readFile(file) {
  return fs.readFileSync(file, { encoding: 'utf8' })
}

function imageToBase64(file) {
    var data = fs.readFileSync(file)
    return new Buffer.from(data).toString('base64')
}

function loadTemplate(templatePath) {
  var template = readFile(templatePath)

  // Inline images as base64
  regex = /<img src="(?!data:image)([^"]*)">/
  while (result = regex.exec(template)) {
    imagePath = path.join(path.dirname(templatePath), result[1])
	  extension = imagePath.split('.').pop()
	  base64 = imageToBase64(imagePath)
	  template = template.replace(regex, '<img src="data:image/' + extension + ';base64,' + base64 + '">')
  }

  return template
}

function loadContext(contextPath) {
  return readFile(contextPath)
}

function injectContext(source, context) {
  var template = handlebars.compile(source)
  return template(JSON.parse(context))
}

async function makePDF(html, output) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setContent(html)
  await page.pdf({ path: output, format: 'A4' })

  await browser.close()
}

const args = minimist(process.argv.slice(2))

const templatePath = args["template"]
if (!templatePath) {
  die('No --template argument specified')
}

const contextPath = args["context"]
if (!contextPath) {
  die('No --context argument specified')
}

const outputPath = args["output"]
if (!outputPath) {
  die('No --output argument specified')
}

const template = loadTemplate(templatePath)
const context = loadContext(contextPath)
const html = injectContext(template, context)

makePDF(html, outputPath)
