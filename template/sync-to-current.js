// Merge all `package.extend.json` to the template and write to `package.json`.

const { existsSync } = require('fs');
const fs = require('fs/promises');
const path = require('path');

const templateJson = require('./package.json');

const sync = async () => {
  const packagesDir = 'packages';
  const packages = await fs.readdir(packagesDir);
  let shouldError = false;

  await Promise.all(
    packages.map(async (packageJson) => {
      const extended = JSON.parse(
        await fs.readFile(path.join(packagesDir, packageJson, 'package.extend.json'), 'utf8')
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

      const target = path.join(packagesDir, packageJson, 'package.json');

      if (!existsSync(target)) {
        shouldError = true;
      }

      await fs.writeFile(target, JSON.stringify(result, undefined, 2) + '\n');
    })
  );

  if (!process.argv.includes('--silent') && shouldError) {
    console.log(
      '**CONNECTOR SYNC SCRIPT**\n\nNew `package.json` created, run `pnpm i` again to update lockfile.'
    );
    process.exit(1);
  }
};

void sync();
