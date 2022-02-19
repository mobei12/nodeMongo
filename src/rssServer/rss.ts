import * as express from "express";
import {Request, Response} from "express";
import {read} from "feed-reader";
import Parser from "rss-parser";

type CustomFeed = {foo: string};
type CustomItem = {bar: number};

let router = express.Router();
/**
 * @description 获取RSS数据
 * @param {string} url  RSS地址
 */
router.get("/getFeedListByURL", (req: any, res: Response) => {
	const parser: Parser<CustomFeed, CustomItem> = new Parser({
		customFields: {
			feed: ["foo"],
			//            ^ will error because `baz` is not a key of CustomFeed
			item: ["bar"],
		},
	});
	const url = req.query.url;
	(async () => {
		const feed = await parser.parseURL(url);
		res.send(feed);
	})();
});
/**
 * @description 获取RSS数据
 * @param {string} url  RSS地址
 */
router.get("/getFeedListByURL1", (req: any, res: Response) => {
	const url = req.query.url;
	read(url)
		.then(feed => {
			console.log(feed);
			res.send(feed);
		})
		.catch(err => {
			console.log(err);
		});
});
module.exports = router;
