// Merge all `package.extend.json` to the template and write to `package.json`.

const { existsSync } = require('fs');
const fs = require('fs/promises');
const path = require('path');

const templateJson = require('./package.json');

const dependencyFields = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
];

const dependencyChanged = (json1, json2) => {
  return !dependencyFields.every((field) => {
    if (typeof json1[field] !== typeof json2[field]) {
      return false;
    }

    if (typeof json1[field] !== 'object' || json1[field] === null) {
      return json1[field] === json2[field];
    }

    const entries1 = Object.entries(json1[field]).sort(([a], [b]) => a.localeCompare(b));
    const entries2 = Object.entries(json2[field]).sort(([a], [b]) => a.localeCompare(b));

    return (
      entries1.length === entries2.length &&
      entries1.every(
        ([key, value], index) => key === entries2[index][0] && value === entries2[index][1]
      )
    );
  });
};

const sync = async () => {
  const packagesDir = 'packages';
  const packages = await fs.readdir(packagesDir);
  let shouldError = false;

  await Promise.all(
    packages.map(async (packageName) => {
      // Copy tsconfig.*.json
      await Promise.all(
        ['', 'base', 'build', 'test'].map(async (suffix) => {
          const filename = ['tsconfig', suffix, 'json'].filter(Boolean).join('.');
          return fs.copyFile(
            path.join('templates', filename),
            path.join(packagesDir, packageName, filename)
          );
        })
      );

      // Sync package.json
      const extended = JSON.parse(
        await fs.readFile(path.join(packagesDir, packageName, 'package.extend.json'), 'utf8')
      );
      const result = { ...templateJson };

      for (const [key, value] of Object.entries(extended)) {
        if (key === '$schema') {
          continue;
        }

        if (typeof value === 'object' && value !== null) {
          result[key] = { ...result[key], ...value };
        } else {
          result[key] = value;
        }
      }

      const target = path.join(packagesDir, packageName, 'package.json');

      if (!existsSync(target)) {
        console.warn(`Creating ${target}`);
        shouldError = true;
      } else if (dependencyChanged(JSON.parse(await fs.readFile(target, 'utf8')), result)) {
        console.warn(`Updating dependencies of ${target}`);
        shouldError = true;
      }

      await fs.writeFile(target, JSON.stringify(result, undefined, 2) + '\n');
    })
  );

  if (!process.argv.includes('--silent') && shouldError) {
    console.log(
      '**CONNECTOR SYNC SCRIPT**\n\nNew `package.json` created or dependency has changed, run `pnpm i` again to update lockfile.'
    );
    process.exit(1);
  }
};

void sync();
