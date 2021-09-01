export interface userModelInstance {
	username: string;
	password?: string;
	[propName: string]: any;
}
export interface exerciseRecordInstance {
	user_id: string;
	duration: Number;
	number_of_times: Number;
	number_of_breaks: Number;
	single_time: Number;
	ctime: Date;
}
/*一个ts接口文件，暂时没用，先留着*/
