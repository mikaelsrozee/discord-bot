import DB from 'pouchdb'

const defaults = {
    _id: 'data',
    alias: '!',
}

export default class Database {
    database: PouchDB.Database<{}>

    constructor() {
        this.database = new DB('db')
        this.init()
    }

    init() {
        this.database.get('data').then(() => console.log('Initialised database')).catch((e) => {
            if (e.status === 404) {
                this.database?.put(defaults).then(() => console.log('Initialised database'))
            } else {
                throw e
            }
        })
    }
}
