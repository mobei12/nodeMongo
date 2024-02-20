import mongoose, { Connection, Document, Model, Schema } from "mongoose"
class MongooseProvider {
    private static instance: MongooseProvider
    private connection: Connection;
    private constructor() {
        mongoose.connect('mongodb://root:123456@127.0.0.1:27017/')
        this.connection = mongoose.connection
        this.connection.on('error', (err) => { console.error(`服务器错误：${err}`) })
        this.connection.on('open', () => { console.log('数据库连接成功!!') })
    }
    public static getInstance(): MongooseProvider {
        if (!this.instance) {
            MongooseProvider.instance = new MongooseProvider()
        }
        return MongooseProvider.instance
    }
    public getModel<T extends Document>(name: string, schema?: Schema<T>): Model<T> {
        return this.connection.model<T>(name, schema, name)
    }
    public disconnect() {
        this.connection.close()
        console.log('数据库连接断开')
    }
}
export default MongooseProvider