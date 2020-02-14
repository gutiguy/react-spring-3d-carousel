declare module "*.png";

type Slide = {
  content: JSX.Element;
  onClick?: () => void;
  key: any;
};
