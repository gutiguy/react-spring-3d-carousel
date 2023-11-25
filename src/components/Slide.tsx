import React from "react";
import styled from "@emotion/styled";
import { Spring } from "react-spring/renderprops";
import { OffsetFn } from "./Carousel";

const SlideContainer = styled.div`
  position: absolute;
  height: 100%;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;

  img {
    object-fit: scale-down;
    display: block;
    max-height: 100%;
  }
`;

interface IProps {
  content: JSX.Element;
  onClick?: () => void;
  offsetRadius: number;
  index: number;
  animationConfig: object;
  opacity: number;
}

export default function Slide({
  content,
  offsetRadius,
  index,
  animationConfig,
  onClick,
  opacity,
}: IProps) {
  const offsetFromCenter = index - offsetRadius;
  offsetFn?: OffsetFn
}

const getDefaultTranslateX = (
  offsetFromCenter: number,
  offsetRadius: number,
  index: number
) => {
  const totalPresentables = 2 * offsetRadius + 1;
  const translateXoffset =
    50 * (Math.abs(offsetFromCenter) / (offsetRadius + 1));
  let translateX = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateX = 0;
    } else if (index === totalPresentables - 1) {
      translateX = -100;
    }
  }

  if (offsetFromCenter > 0) {
    translateX += translateXoffset;
  } else if (offsetFromCenter < 0) {
    translateX -= translateXoffset;
  }
  return translateX;
};

export default function Slide({
  content,
  offsetRadius,
  index,
  animationConfig,
  onClick,
  offsetFn,
}: IProps) {
  const offsetFromCenter = index - offsetRadius;
  const distanceFactor = 1 - Math.abs(offsetFromCenter / (offsetRadius + 1));

  let to = offsetFn?.(offsetFromCenter, index) || {};

  if (to.transform === undefined) {
    const translateX = getDefaultTranslateX(
      offsetFromCenter,
      offsetRadius,
      index,
    );
    to.transform = `translateY(-50%) translateX(${translateX}%) scale(${distanceFactor})`;
  }

  if (to.left === undefined) {
    to.left = `${
      offsetRadius === 0 ? 50 : 50 + (offsetFromCenter * 50) / offsetRadius
    }%`;
  }

  if (to.opacity === undefined) {
    to.opacity = distanceFactor * distanceFactor;
  }

  return (
    <Spring
      to={{
        transform: `translateY(-50%) translateX(${translateX}%) scale(${distanceFactor})`,
        left: `${
          offsetRadius === 0 ? 50 : 50 + (offsetFromCenter * 50) / offsetRadius
        }%`,
        opacity: opacity === null ? distanceFactor * distanceFactor : opacity,
      }}
      config={animationConfig}
    >
    <Spring to={to} config={animationConfig}>
      {(style) => (
        <SlideContainer
          style={{ ...style, zIndex: Math.abs(Math.abs(offsetFromCenter) - offsetRadius) }}
          onClick={onClick}
        >
          {content}
        </SlideContainer>
      )}
    </Spring>
  );
}
