import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';

// Module dùng chung, phải export ra ngoài để sử dụng trong các module khác
// Phải đánh dấu là Global để các module khác không cần import lại SharedModule
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Ko có là nó lỗi nếu dùng PrismaService ở module khác
})
export class SharedModule {}
