module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true
	},
	extends: [
		"eslint:recommended"
		//"plugin:prettier/recommended" /* 如果同时使用了eslint和prettier发生冲突了，会关闭掉与prettier有冲突的规则，也就是使用prettier认为对的规则 */
	],
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true
		},
		sourceType: "module"
	},
	plugins: ["prettier"],
	parser: "babel-eslint",
	rules: {
		semi: [2, "always"], //语句强制分号结尾
		"no-extra-semi": 2, //禁止多余的分号
		eqeqeq: ["error", "smart"], //必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
		//"prettier/prettier": "error", // 这项配置 对于不符合prettier规范的写法，eslint会提示报错
		"no-redeclare": "error", // 禁止重复定义变量
		// 禁止使用保留字作为变量名
		"no-shadow-restricted-names": "error",
		// 禁止使用未定义的变量
		"no-undef": [
			"error",
			{
				typeof: false
			}
		],
		// @fixable 禁止将 undefined 赋值给变量
		"space-before-function-paren": 0, //比如在函数名和()之间要不要加上空格这个
		"no-undef-init": "error",
		// 禁止对 undefined 重新赋值
		"no-undefined": "error",
		// 定义过的变量必须使用
		// "no-unused-vars": [
		// 	"error",
		// 	{
		// 		vars: "local ",
		// 		args: "none",
		// 		caughtErrors: "none",
		// 		ignoreRestSiblings: true
		// 	}
		// ],
		// 变量必须先定义后使用
		"no-use-before-define": [
			"error",
			{
				functions: false,
				classes: false,
				variables: false
			}
		]
	}
};
