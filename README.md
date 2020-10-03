# make-invoice

*Mirrors: [GitHub] ~ [GitLab]*

A headless PDF invoice generator

## Usage

`make-invoice` takes two ingredients to generate an invoice: a template and a context.

The template is an HTML file defining the structure and layout of the invoice. You can use [handlebars](https://handlebarsjs.com/) syntax for defining placeholders that are later filled in using the context. Check out `test/template.html` for an example template adapted from [sparksuite/simple-html-invoice-template](https://github.com/sparksuite/simple-html-invoice-template).

The context is a JSON file defining the data to insert into the template. Check out `test/context.json` for an example. You will normally use a single HTML template and a different context JSON file for each invoice.

To generate a PDF invoice out of a template and a context, run

```
node make-invoice.js --template template.html --context context.json --output invoice.pdf
```

The invoice produced out of the example template and context mentioned above can be found under `test/invoice.pdf`.

[GitHub]: https://github.com/Johennes/make-invoice
[GitLab]: https://gitlab.com/cherrypicker/make-invoice
