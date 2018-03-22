function TextBox(textArea) {
  this.textArea = textArea;

  this.removeBlankLines = function() {
    var newLines = [];
    var lines = this.getEntries();
    for (var i = 0; i < lines.length; i++) {
      var thisLine = lines[i];
      if (thisLine.length > 0) {
        newLines.push(thisLine);
      }
    }
    this.setEntries(newLines);
  }

  this.removeDuplicateLines = function() {
    var newLines = [];
    var duplicates = 0;
    var lines = this.getEntries();
    for (var i = 0; i < lines.length; i++) {
      var thisLine = lines[i];
      if (newLines.indexOf(thisLine) == -1) {
        newLines.push(thisLine);
      }
      else {
        duplicates += 1;
      }
    }
    this.setEntries(newLines);
    return duplicates;
  }

  this.getEntries = function() {
    return this.textArea.value.replace(/\r\n/g, "\n").split("\n");
  }

  this.getNonBlankEntries = function() {
    var entries = this.getEntries();
    return entries.removeBlanks();
  }

  this.setEntries = function(entries) {
    this.textArea.value = entries.join('\n');
  }

  this.appendEntries = function(entries) {
    if (this.textArea.value) {
      this.textArea.value += '\n';
    }
    this.textArea.value += entries.join('\n');
  }

  this.removeEntry = function(entry) {
    var lines = this.getEntries();
    lines.splice(lines.indexOf(entry), 1);
    this.textArea.value = lines.join('\n');
  }
}
