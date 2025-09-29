import { Controller, Get, Param, Res, HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { Response } from 'express';
import { Mp4Service } from './mp4.service';

@Controller('mp4')
export class Mp4Controller {
    private logger = new Logger(Mp4Controller.name);

    constructor(private readonly mp4Service: Mp4Service) { }

    @Get(':filename')
    async getMp4(@Param('filename') filename: string, @Res() res: Response) {
        this.logger.log(`getMp4 method 진입 확인: ${filename}`);
        const filePath = this.mp4Service.getFilePath(filename);
        this.logger.log(`filePath: ${filePath}`);
        const isFast = await this.mp4Service.isFastStart(filePath);
        this.logger.log(`isFast: ${isFast}`);
        if (!isFast) {
            throw new HttpException('MP4 file is not in Fast Start format', HttpStatus.BAD_REQUEST);
        }
        res.sendFile(filePath, (err) => {
            if (err) {
                this.logger.log('sendFile error: {}', err);
                res.status(HttpStatus.NOT_FOUND).json({ message: 'File not found', error: err.message });
                return;
            }
            this.logger.log("check : sendFile");
        });
    }
}
