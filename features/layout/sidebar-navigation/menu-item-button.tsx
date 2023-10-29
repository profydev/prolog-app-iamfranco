import React from "react";
import { Button } from "@features/ui";
import classNames from "classnames";
import styles from "./menu-item-link.module.scss";

type MenuItemProps = {
  className?: string;
  text: string;
  iconSrc: string;
  onClick: () => void;
  isCollapsed: boolean;
  toRotateIcon?: boolean;
};

export function MenuItemButton({
  className,
  text,
  onClick,
  iconSrc,
  isCollapsed,
  toRotateIcon = false,
}: MenuItemProps) {
  const iconClass = `${styles.icon} ${toRotateIcon && styles.rotateIcon}`;

  return (
    <li className={classNames(styles.listItem, className)}>
      <Button className={styles.anchor} onClick={onClick}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={iconClass} src={iconSrc} alt={`${text} icon`} />{" "}
        {!isCollapsed && text}{" "}
      </Button>
    </li>
  );
}
