// Sync limited info of all `package.json` to `package.extend.json`.

import fs from 'fs/promises';
import path from 'path';

const sync = async () => {
  const packagesDir = 'packages';
  const packages = await fs.readdir(packagesDir);

  await Promise.all(
    packages
      .filter((packageName) => packageName !== '.DS_Store')
      .map(async (packageJson) => {
        const current = JSON.parse(
          await fs.readFile(path.join(packagesDir, packageJson, 'package.json'), 'utf8')
        );
        const extendPath = path.join(packagesDir, packageJson, 'package.extend.json');
        const extended = JSON.parse(await fs.readFile(extendPath, 'utf8'));

        extended.version = current.version;

        await fs.writeFile(extendPath, JSON.stringify(extended, undefined, 2) + '\n');
      })
  );
};

void sync();
