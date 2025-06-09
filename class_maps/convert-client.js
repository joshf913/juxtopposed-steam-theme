import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const inputPath = resolve('class_maps/client.json');
const outputJSPath = resolve('class_maps/classMap.js');
const outputCSSPath = resolve('class_maps/class-aliases.css');

function convertClassMap(rawMap) {
  return rawMap; 
}

function generateJSModule(classMap) {
  return `// Auto-generated class map\n\nexport default ${JSON.stringify(classMap, null, 2)};\n`;
}

function generateCSSAliases(classMap) {
  let css = '/* Auto-generated CSS aliases */\n\n';
  for (const section in classMap) {
    for (const className in classMap[section]) {
      const obfClass = classMap[section][className];
      css += `.${section}-${className} {\n  composes: ${obfClass};\n}\n\n`;
    }
  }
  return css;
}

async function main() {
  const rawData = readFileSync(inputPath, 'utf-8');
  const rawMap = JSON.parse(rawData);

  const classMap = convertClassMap(rawMap);

  writeFileSync(outputJSPath, generateJSModule(classMap));
  writeFileSync(outputCSSPath, generateCSSAliases(classMap));

  console.log('Conversion complete:');
  console.log(`- JS class map: ${outputJSPath}`);
  console.log(`- CSS aliases: ${outputCSSPath}`);
}

main();
