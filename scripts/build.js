const cp = require('child_process');
const fs = require('fs');

let command = 'tsc';
if (process.platform === 'win32') {
  command += '.cmd';
}

console.log("Compiling for CommonJS");

if (fs.existsSync('cjs')) {
  fs.rmdirSync('cjs', { recursive: true });
}

const result = cp.spawnSync(command, [
  '--project', 'tsconfig.src.json',
  '--importHelpers', 'true',
  '--removeComments', 'true',
  '--target', 'ES5',
  '--module', 'CommonJS',
  '--sourceMap', 'true',
  '--outDir', 'cjs',
  '--listEmittedFiles', 'true',
], {
  stdio: 'inherit'
});

if (result.status !== 0) {
  console.error('Compiling failed');
  console.error(result.error);
}

console.log("Compiling for ESModule");

if (fs.existsSync('esm')) {
  fs.rmdirSync('esm', { recursive: true });
}

cp.spawnSync(command, [
  '--project', 'tsconfig.src.json',
  '--importHelpers', 'true',
  '--removeComments', 'true',
  '--target', 'ES5',
  '--module', 'ESNext',
  '--moduleResolution', 'Node',
  '--sourceMap', 'true',
  '--outDir', 'esm',
  '--listEmittedFiles', 'true',
], {
  stdio: 'inherit'
});

console.log("Generating declarations");

if (fs.existsSync('dts')) {
  fs.rmdirSync('dts', { recursive: true });
}

cp.spawnSync(command, [
  '--project', 'tsconfig.src.json',
  '--outDir', 'dts',
  '--declaration', 'true',
  '--declarationMap', 'true',
  '--emitDeclarationOnly', 'true',
  '--listEmittedFiles', 'true',
], {
  stdio: 'inherit'
});
