import { mkdirSync, writeFileSync } from 'fs';
import { OUTPUT_FOLDER } from '../constants/constants';

const writeFile = (fileName: string, content: string): void => {
    mkdirSync(OUTPUT_FOLDER, { recursive: true });
    writeFileSync(`${OUTPUT_FOLDER}/${fileName}`, content);
};

export default writeFile;