import * as bcrypt from 'bcryptjs';

import { prisma } from '../generated/prisma-client';

export async function importDepartment() {
  const routePages = [];
  for (let index = 0; index < 100; index += 1) routePages.push(index);

  await prisma.deleteManyAdmins();
  await prisma.deleteManyDepartments();
  console.log("删除部门和用户");

  const root = await prisma.createDepartment({
    name: "root",
    routePages: { set: routePages }
  });
  console.log("创建root权限组");
  const password = await bcrypt.hash("123456", 10);
  await prisma.createAdmin({
    name: "littleTommyTan",
    userName: "tommytandm",
    password,
    departmentId: root.id,
    departmentName: root.name,
    availiable: true,
    routePages: { set: root.routePages }
  });
  console.log("创建超级用户");
}
