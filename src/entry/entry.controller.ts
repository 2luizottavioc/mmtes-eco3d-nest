import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EntryService } from './entry.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.entryService.create(createEntryDto);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.entryService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @CurrentUser() user: User) {
    return this.entryService.findOne(id, user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateEntryDto: UpdateEntryDto, @CurrentUser() user: User) {
    return this.entryService.update(id, updateEntryDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @CurrentUser() user: User) {
    return this.entryService.remove(id, user);
  }
}
