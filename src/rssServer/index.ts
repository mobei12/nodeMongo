import express, { Router, Request, Response } from "express";
import {read} from "feed-reader";
import Parser from "rss-parser";

type CustomFeed = {foo: string};
type CustomItem = {bar: number};

const router:Router = express.Router();
/**
 * @description 获取RSS数据
 * @param {string} url  RSS地址
 */
router.get("/getFeedListByURL", async (req: Request, res: Response) => {
	try {
		const parser: Parser<CustomFeed, CustomItem> = new Parser({
			customFields: {
				feed: ["foo"],
				//            ^ will error because `baz` is not a key of CustomFeed
				item: ["bar"],
			},
		});
		const url:string = req.query.url as string;
		const feed = await parser.parseURL(url);
		res.send(feed);
	} catch (error) {
		console.error('rss异步请求错误', error);
		res.status(500).send('rss异步请求错误');
	}
});
/**
 * @description 获取RSS数据
 * @param {string} url  RSS地址
 */
router.get("/getFeedListByURL1", (req: Request, res: Response) => {
	const url = req.query.url as string;
	read(url)
		.then(feed => {
			console.log(feed);
			res.send(feed);
		})
		.catch(err => {
			console.log(err);
		});
});
export default router
