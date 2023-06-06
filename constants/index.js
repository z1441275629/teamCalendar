const FOUR_DAY_CYCLE = [
  {
    desc: "白班",
    alias: "付",
    workTime: [["08:00:00", "17:30:00"]],
  },
  {
    desc: "夜班",
    alias: "值",
    workTime: [
      ["08:00:00", "11:30:00"],
      ["17:30:00", "23:59:59"],
    ],
  },
  {
    desc: "下夜班",
    alias: "下",
    workTime: [["00:00:00", "08:00:00"]],
  },
  {
    desc: "空白班",
    alias: "空",
    workTime: [["08:00:00", "11:30:00"]],
  },
];
