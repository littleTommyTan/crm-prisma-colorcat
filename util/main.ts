import { importDepartment } from './departmentImport';
import { importDictionaryCore } from './dictionaryImport';

async function main() {
  await importDepartment();
  await importDictionaryCore();
}
main();
