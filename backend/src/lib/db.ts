import { readFileSync } from 'fs';
import path from 'path';

export function loadSqlSchema(fileName: string) {
  const filePath = path.join(process.cwd(), 'src', 'db', fileName);
  return readFileSync(filePath, 'utf8');
}
