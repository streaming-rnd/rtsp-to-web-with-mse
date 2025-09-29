import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class Mp4Service {
    async isFastStart(filePath: string): Promise<boolean> {
        try {
            const buffer = await readFile(filePath);
            // MP4 박스 파싱: 첫 번째 박스는 ftyp
            let offset = 0;
            const size = buffer.readUInt32BE(offset);
            const type = buffer.toString('ascii', offset + 4, offset + 8);
            console.log({ type });
            if (type !== 'ftyp') {
                return false;
            }
            offset += size;
            // 다음 박스 확인
            const nextSize = buffer.readUInt32BE(offset);
            const nextType = buffer.toString('ascii', offset + 4, offset + 8);
            console.log({ nextType }, "test");
            return nextType === 'moov';
        } catch {
            return false;
        }
    }

    getFilePath(filename: string): string {
        // MP4 파일들이 저장된 디렉토리, 예: ./assets/mp4s
        return join(process.cwd(), 'assets', 'mp4s', filename);
    }
}
