import type { NextPage } from "next";
import type { AppProps } from "next/app";

declare module "*.css";

declare global {
  type JSONValue = string | number | boolean | null | undefined | JSONValue[] | { [key: string]: JSONValue };

  type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
  };

  type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
  };

  type IHandleResponse = [ok: true, errors: null] | [ok: false, errors: { [name: string]: string }];

  type Props<T extends object = {}> = T & { children?: ReactNode };

  type User = {
    id: number;
    rut: string;
    name: string;
    email: string;
    phoneNumber: string;
    position: string;
    image: string;
    isAdmin: boolean;
    token: string;
    buyer: boolean;
    seller: boolean;
  };

  type Company = {
    id: number;
    rut: string;
    name: string;
    email: string;
    phoneNumber: string;
    image: string;
    token: string;
  };

  type Category = {
    id: number;
    name: string;
    parentId: number;
    subCategories: Array;
  };

  type Product = {
    id: number;
    name: string;
    currentPrice: number;
    currentAvailable: number;
    imageUrl: string;
    categoryId: number;
    companyId: number;
  };

  type Discountrule = {
    id: number;
    minimum: number;
    maximum: number;
    discount: float;
  };

  // TODO: more types...
}