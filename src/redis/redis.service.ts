import { Injectable } from '@nestjs/common';
import * as redis from 'redis';
import { promisify } from 'util';

@Injectable()
export class RedisService {
  private client;

  constructor() {
    this.client = redis.createClient({
      legacyMode: true,
      url: 'redis://redis:6379'
  });
  }

  async get(key: string): Promise<any> {
    if (!this.client.connected) { 
    await this.client.connect()
    }
    const getAsync = await promisify(this.client.get).bind(this.client);
    const value = await getAsync(key);

    await  this.client.disconnect();

    return JSON.parse(value);
  }

  async set(key: string, value: any): Promise<void> {
    if (!this.client.connected) { 
      await this.client.connect()
    }

    await this.client.set(key, JSON.stringify(value));
    await  this.client.disconnect();
  }
}
