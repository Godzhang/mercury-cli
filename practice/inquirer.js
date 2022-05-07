const inquirer = require("inquirer");

const question = [
  // {
  //   type: "input",
  //   name: "favorite-book",
  //   message: "your favorite book is:",
  //   default: "沧浪之水",
  // },
  // {
  //   type: "number",
  //   name: "favorite-number",
  //   message: "your favorite number is:",
  // },
  // {
  //   type: "confirm",
  //   name: "handsome",
  //   message: "are you handsome?",
  //   default: true,
  // },
  // {
  //   type: "list",
  //   name: "todo",
  //   message: "你现在想要做什么?",
  //   choices: [
  //     "eat food",
  //     "read a book",
  //     new inquirer.Separator("---line---"),
  //     {
  //       name: "play game",
  //       disabled: "can't available",
  //     },
  //     "work",
  //   ],
  //   default: 1,
  // },
  // {
  //   type: "list",
  //   name: "brand",
  //   message: "请选择你需要购买的手机品牌",
  //   choices: ["Huawei", "Samsung", "Apple", "Xiaomi"],
  //   // 筛选一下结果，将大写转换为小写
  //   filter(value) {
  //     return value.toLowerCase();
  //   },
  // },
  // {
  //   type: "rawlist",
  //   name: "brand",
  //   message: "请选择你需要购买的手机品牌",
  //   choices: ["Huawei", "Samsung", "Apple", "Xiaomi"],
  //   // 筛选一下结果，将大写转换为小写
  //   filter(value) {
  //     return value.toLowerCase();
  //   },
  // },
  // {
  //   type: "expand",
  //   name: "smart phone brand",
  //   message: "选择你的智能手机品牌",
  //   choices: [
  //     {
  //       key: "a",
  //       name: "apple",
  //       value: "apple",
  //     },
  //     {
  //       key: "s",
  //       name: "samsung",
  //       value: "samsung",
  //     },
  //     {
  //       key: "x",
  //       name: "xiaomi",
  //       value: "xiaomi",
  //     },
  //   ],
  //   default: 2,
  // },
  // {
  //   type: "checkbox",
  //   name: "your select",
  //   message: "选择你喜欢的品牌",
  //   choices: [
  //     new inquirer.Separator("---国产品牌---"),
  //     "huawei",
  //     "xiaomi",
  //     "vivo",
  //     "oppo",
  //     new inquirer.Separator("---国外品牌---"),
  //     "apple",
  //     { name: "nokia", disabled: true },
  //     "samsung",
  //   ],
  //   validate(value) {
  //     if (value.length <= 0) {
  //       return "至少选一项";
  //     }
  //     return true;
  //   },
  //   loop: false,
  //   default: ["vivo"],
  // },
  // {
  //   type: "password",
  //   name: "password-1",
  //   message: "请输入密码",
  //   mask: "*",
  // },
  // {
  //   type: "password",
  //   name: "password-2",
  //   message: "请再次确认密码",
  //   mask: "&",
  // },
  // {
  //   type: "editor",
  //   name: "bio",
  //   message: "please write a short bio of at least 3 lines",
  //   validate: (text) => {
  //     if (text.split("\n").length < 3) {
  //       return "Must be at least 3 lines";
  //     }
  //     return true;
  //   },
  // },
  // {
  //   type: "list",
  //   name: "phone",
  //   message: "choice your phone number",
  //   choices: [
  //     {
  //       name: "xiaomi",
  //     },
  //     {
  //       name: "huawei",
  //     },
  //     {
  //       name: "samsung",
  //     },
  //   ],
  // },
];

let answers = {
  apple: "ok",
  oppo: "ok",
};

inquirer.prompt(question).then((ans) => {
  console.log(ans);
});
