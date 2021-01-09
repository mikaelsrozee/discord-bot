import DB from 'pouchdb'

interface Data extends PouchDB.Core.IdMeta, PouchDB.Core.GetMeta {
    alias?: string,
}

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

    async getAlias(): Promise<string> {
        const data: Data = await this.database.get('data')
        const alias = data.alias || '!'
        return alias
    }

    setAlias(val: string) {
        this.database.get('data').then((data: Data) => {
            data.alias = val
        })
    }
}
