const cp = require('child_process');
const fs = require('fs');

let command = 'tsc';
if (process.platform === 'win32') {
  command += '.cmd';
}

console.log("Compiling to esm and dts");

if (fs.existsSync('esm')) {
  fs.rmdirSync('esm', { recursive: true });
}

if (fs.existsSync('dts')) {
  fs.rmdirSync('dts', { recursive: true });
}

cp.spawnSync(command, [
  '--project', 'tsconfig.src.json',
  '--listEmittedFiles', 'true',
], {
  stdio: 'inherit'
});

console.log("Compiling to cjs");

if (fs.existsSync('cjs')) {
  fs.rmdirSync('cjs', { recursive: true });
}

const result = cp.spawnSync(command, [
  '--project', 'tsconfig.src.json',
  '--module', 'CommonJS',
  '--outDir', 'cjs',
  '--declaration', 'false',
  '--declarationDir', 'null',
  '--declarationMap', 'false',
  '--listEmittedFiles', 'true',
], {
  stdio: 'inherit'
});

if (result.status !== 0) {
  console.error('Compiling failed');
  console.error(result.error);
}
