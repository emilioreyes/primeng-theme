import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
    setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
