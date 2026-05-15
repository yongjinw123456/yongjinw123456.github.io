import * as fs from 'fs';

const files = [
  'src/pages/h5/Events.tsx',
  'src/pages/h5/Stats.tsx',
  'src/pages/h5/Profile.tsx',
  'src/pages/h5/Login.tsx',
  'src/pages/h5/H5ClaimsCalculator.tsx',
  'src/components/H5Layout.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Fix the icon cascade
  content = content.replace(/w-6 h-6/g, 'w-5 h-5');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed icons in ' + file);
});
