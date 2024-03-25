declare namespace Express {
    interface Request {
        user: {
            user_id?: string,
            level?: number,
            user_name?: string
        }
    }
}
