import { prisma } from '../generated/prisma-client';

const coreDictionary = [
  "个人属性",
  "回访字典",
  "市场合作机构",
  "收费字典",
  "广告类别和计划", // 5
  "手术状态和疗程状态",
  "项目字典",
  "客户标签",
  "咨询方式",
  "咨询结果", // 10
  "客户VIP等级",
  "来院类别",
  "区域",
  "主来源",
  "收费项目" // 15
];

/** 个人属性一级 */
const personalPropDics = [
  "婚姻状况",
  "手机型号",
  "教育背景",
  "职业",
  "汽车型号",
  "客户VIP等级"
];

/** 市场合作机构一级 */
const agencyDics = ["机构类别", "机构级别", "合作状态"];
/** 回访字典一级 */
const tracebackDics = [
  "回访结果",
  "客户流向",
  "回访状态",
  "回访主题",
  "回访类型",
  "回访方式"
];
/** 手术状态和疗程状态一级 */
const surgeryDics = ["手术状态", "治疗状态"];
/** 收费字典一级 */
const billDics = ["收费类别", "收入归类", "发票归类"];

export async function importDictionaryCore() {
  await prisma.deleteManyDictionaries();
  console.log("删除所有字典");
  for (let i = 1; i < coreDictionary.length + 1; i += 1) {
    const core = coreDictionary[i - 1];
    await prisma.createDictionary({
      itemName: core,
      rootIndex: -i,
      itemAvailiable: true
    });
  }
  console.log("核心字典添加成功");
  const coreDics = await prisma.dictionaries();
  const personalProp = coreDics.find(ele => ele.rootIndex === -1);
  for (let i = 0; i < personalPropDics.length; i += 1) {
    await prisma.createDictionary({
      itemName: personalPropDics[i],
      rootIndex: i + 100,
      sortIndex: i,
      itemParentId: personalProp.id,
      itemAvailiable: true
    });
  }
  console.log("个人属性一级添加成功");
  const traceback = coreDics.find(ele => ele.rootIndex === -2);
  for (let i = 0; i < tracebackDics.length; i += 1) {
    await prisma.createDictionary({
      itemName: tracebackDics[i],
      rootIndex: i + 200,
      sortIndex: i,
      itemParentId: traceback.id,
      itemAvailiable: true
    });
  }
  console.log("回访记录一级添加成功");
  const agency = coreDics.find(ele => ele.rootIndex === -3);
  for (let i = 0; i < agencyDics.length; i += 1) {
    await prisma.createDictionary({
      itemName: agencyDics[i],
      rootIndex: i + 300,
      sortIndex: i,
      itemParentId: agency.id,
      itemAvailiable: true
    });
  }
  console.log("市场机构一级添加成功");
  const surgery = coreDics.find(ele => ele.rootIndex === -6);
  for (let i = 0; i < surgeryDics.length; i += 1) {
    await prisma.createDictionary({
      itemName: surgeryDics[i],
      rootIndex: i + 600,
      sortIndex: i,
      itemParentId: surgery.id,
      itemAvailiable: true
    });
  }
  console.log("手术状态治疗状态一级添加成功");
  const bill = coreDics.find(ele => ele.rootIndex === -4);
  for (let i = 0; i < billDics.length; i += 1) {
    await prisma.createDictionary({
      itemName: billDics[i],
      rootIndex: i + 400,
      sortIndex: i,
      itemParentId: bill.id,
      itemAvailiable: true
    });
  }
  console.log("收费归类一级添加成功");
}
