const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const pubDir = path.join(rootDir, 'public');
const proj01Dir = path.join(rootDir, 'projects', '01');

// 1. Move i18n JSON files
const i18nEsOld = path.join(rootDir, 'src', 'i18n', 'experience-job-es.json');
const i18nEnOld = path.join(rootDir, 'src', 'i18n', 'experience-job-en.json');
const i18nEsNew = path.join(proj01Dir, 'experience-job-es.json');
const i18nEnNew = path.join(proj01Dir, 'experience-job-en.json');

if (fs.existsSync(i18nEsOld)) {
    fs.renameSync(i18nEsOld, i18nEsNew);
}
if (fs.existsSync(i18nEnOld)) {
    fs.renameSync(i18nEnOld, i18nEnNew);
}

// 2. Update 01.jsx
const jsxFile = path.join(proj01Dir, '01.jsx');
if (fs.existsSync(jsxFile)) {
    let content = fs.readFileSync(jsxFile, 'utf8');
    content = content.replace(/from '\.\.\/\.\.\/src\/i18n\/experience-job-es\.json'/g, "from './experience-job-es.json'");
    content = content.replace(/from '\.\.\/\.\.\/src\/i18n\/experience-job-en\.json'/g, "from './experience-job-en.json'");
    // update iframe src
    content = content.replace(/src="\/mapCFRO\.html"/g, 'src="/projects/01/mapCFRO.html"');
    fs.writeFileSync(jsxFile, content, 'utf8');
}

// 3. Move mapCFRO.html and dependencies
const itemsToMove = [
    'mapCFRO.html',
    'css',
    'js',
    'lib',
    'data'
];

itemsToMove.forEach(item => {
    const oldPath = path.join(pubDir, item);
    const newPath = path.join(proj01Dir, item);
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Moved ${item} to projects/01/`);
    }
});

console.log("Done moving mapCFRO and its data.");
