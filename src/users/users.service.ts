import { Injectable } from '@nestjs/common';
import { userDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'matthew',
      email: 'illmy_@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'james',
      email: 'userJames_@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'cliton',
      email: 'use_clint_@gmail.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (!rolesArray.length)
        throw new NotFoundException('user role not found');
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  create(user: userDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  upddate(id: number, updatedUser: updateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
