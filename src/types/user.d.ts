// 登录成功返回类型
export interface Profile {
  id: string;
  account: string;
  mobile: string;
  token: string;
  avatar: string;
  nickname: string;
  gender: string;
  birthday?: string;
  cityCode: string;
  provinceCode: string;
  profession: string;
}
