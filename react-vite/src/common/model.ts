import Dexie from 'dexie';

export const db:any = new Dexie('test');

db.version(1).stores({
    notes:'++id, name, age'
})

class Model {
    getNotes (){
        return db.notes.toArray()
    }
}

export default new Model()