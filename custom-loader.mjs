import { pathToFileURL } from 'url';
import { resolve as resolvePath, dirname } from 'path';
import fs from 'fs/promises';

export async function resolve(specifier, context, defaultResolve) {
  const { parentURL = null } = context;

  // Check if the specifier ends with 'esm-example.js'
  if (specifier.endsWith('esm-example.js')) {
    // Resolve the path to the file that should replace 'esm-example.js'
    const replacementPath = resolvePath(dirname(parentURL ? new URL(parentURL).pathname : '.'), 'your-replacement-file.js');

    // Check if the replacement file exists
    try {
      await fs.access(replacementPath);
      return {
        url: pathToFileURL(replacementPath).href,
      };
    } catch (error) {
      throw new Error(`Replacement file for ${specifier} not found.`);
    }
  }

  // Use the default resolver for all other specifiers
  return defaultResolve(specifier, context, defaultResolve);
}