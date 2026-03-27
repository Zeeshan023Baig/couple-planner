const fs = require('fs');
const html = fs.readFileSync('C:/Users/Zeesh/Downloads/couples-money-planner.html', 'utf8');
const match = html.match(/<style>([\s\S]*?)<\/style>/);
if (match) {
  fs.writeFileSync('src/app/globals.css', match[1].trim());
  console.log('CSS extracted to src/app/globals.css');
} else {
  console.log('No <style> block found.');
}
