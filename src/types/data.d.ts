// 所有接口的通用类型
export interface ApiRes<T> {
  code: string;
  msg: string;
  result: T;
}

// 单个分类的类型
export interface CategoryItem {
  id: string;
  name: string;
  picture: string;
  children: CategoryItem[]; // 结构与外层一样，可以使用递归
  open: boolean;  // 控制弹出层
}
