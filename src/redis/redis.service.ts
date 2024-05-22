import { Injectable } from '@nestjs/common';
import * as redis from 'redis';
import { promisify } from 'util';

@Injectable()
export class RedisService {
  private client;

  constructor() {
    this.client = redis.createClient();
  }

  async get(key: string): Promise<any> {
    const getAsync = promisify(this.client.get).bind(this.client);
    const value = await getAsync(key);
    return JSON.parse(value);
  }

  async set(key: string, value: any): Promise<void> {
    this.client.set(key, JSON.stringify(value));
  }
}
