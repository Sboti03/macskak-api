import { Injectable } from '@nestjs/common';
import Cat from './cat';
import CatTdo from './cat.tdo';

import db from './db';

@Injectable()
export class DbManagerService {


    async getAllCat() {
        let sql = 'SELECT id, suly as weight, szem_szin as eyeColor FROM macskak'
        const [rows] = await db.execute(sql)
        return rows as Cat[]
    }

    async getAllCatWithSort(sortBy: string) {
        let sql = 'SELECT id, suly as weight, szem_szin as eyeColor FROM macskak'
        if(sortBy != null) {
            switch(sortBy) {
                case 'suly':
                    sql += ' ORDER BY suly'
                    break;
                case 'szem_szin':
                    sql += ' ORDER BY szem_szin'
                    break;
            }
        }
        const [rows] = await db.execute(sql)
        return rows as Cat[]
    }

    async getCatById(id: number) {
        let sql = 'SELECT * FROM macskak WHERE id = ?'
        const [rows] = await db.execute(sql, [id])
        return rows[0] as Cat
    }

    async deleteCatById(id: number) {
        let sql = 'DELETE FROM macskak WHERE id = ?'
        await db.execute(sql, [id])
    }

    async createCat(cat: CatTdo) {
        let sql = 'INSERT INTO macskak (suly, szem_szin) VALUES (?, ?)'
        const [result]: any = await db.execute(sql, [cat.suly, cat.szem_szin])
        return result.insertId
    }
}
