declare namespace Express {
    interface Request {
        user: {
            user_id?: string,
            user_name?: string
        }
    }
}
