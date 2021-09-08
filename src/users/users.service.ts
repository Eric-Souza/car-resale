import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    const user = await this.repo.findOne(id); // Returns one record or null

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  find(email: string) {
    return this.repo.find({ email }); // Returns an array
  }

  async update(id: number, attributes: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, attributes);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    return this.repo.remove(user);
  }
}
