<a href="https://breni-tiber.github.io/FFG_CharacterSheet_html/public/sheet.html">Preview in browser</a>

<a href="https://github.com/breni-tiber/FFG_CharacterSheet_html/releases/latest">PDFs</a>

<h3>Data</h3>
Entered values are only stored in the browser's local storage and therefore, can be lost if not extracted.

<h3>Tips and Tricks</h3>

<h4>Extracting Data</h4>
Open the local storage in your browser (Chrome: Inspect -> Application -> Local storage).
Select the current website under Local storage and a table with one row should be displayed.
In the table copy the `value` of that row and save it somewhere e.g. in a file.

<h4>Change font size before printing</h4>
If you entered more text than fits inside a text field, it will just be clipped for printing.
To avoid this follow these instructions before printing:
1. Right click in the field.
2. Click 'Inspect'.
3. On the right or bottom part 'styles' locate and edit the `element.style` block:
   ```
   element.style {
       font-size: 9pt;
   }
   ```
4. Play around with the number until it suits your text. Changes take effect immediately.

Note: this will not be saved and will be reset when reloading the page!
