import { Global, Module, Provider } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { HashingService } from './services/hashing.service';
import { HASH_SALT_ROUNDS } from 'src/common/constants/hashing.constant';

const sharedModules: Provider[] = [
  PrismaService, 
  HashingService,
  {
    provide: HASH_SALT_ROUNDS,
    useValue: 10
  }
]

// Module dùng chung, phải export ra ngoài để sử dụng trong các module khác
// Phải đánh dấu là Global để các module khác không cần import lại SharedModule
@Global()
@Module({
  providers: sharedModules,
  exports: sharedModules, // Ko có là nó lỗi nếu dùng PrismaService ở module khác
})
export class SharedModule {}
