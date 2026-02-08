export type MenuItemProps = {
      id: number;
      label?: string;
      link?: string;
      value?: string;
      subitems?: Array<{
            id: number,
            label: string,
            link: string,
      }>
}
export type StatusTable = "EMPTY" | "OCCUPIED"