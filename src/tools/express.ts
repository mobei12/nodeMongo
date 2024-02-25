import express, { Router, Request, Response, NextFunction } from "express";

type AsyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncHandler: AsyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
export enum methods {
    get = "get",
    post = "post",
    put = "put",
    delete = "delete",
    patch = "patch",
}
interface AsyncRouter extends Router {
    useAsync: (method: methods, path: string, ...handlers: Function[]) => void;
}

// 工厂函数用于创建带有自定义方法的路由器
export const createAsyncRouter = (): AsyncRouter => {
    const router:AsyncRouter = express.Router() as AsyncRouter;

    // 使用模块扩展添加 useAsync 方法
    router.useAsync = (method: methods, path: string, ...handlers: Function[]) => {
        if (!router[method]) {
            throw new Error(`HTTP method '${method}' is not supported.`);
          }
        router[method](path, ...handlers.map((handler) => asyncHandler(handler)));
    };

    router.use((req: Request, res: Response, next: NextFunction) => {
        console.log(`${req.path}请求的时间`, Date.now());
        next();
    });

    return router;
};
